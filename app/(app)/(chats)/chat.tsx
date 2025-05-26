import { useSocket } from "@/context/Algo";
import { getChatById, getMessages } from "@/services/chatService";
import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { getItem } from "expo-secure-store";
import { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const { chatId } = useLocalSearchParams();
  const theme = useTheme();
  const socket = useSocket();

  const [messages, setMessages] = useState<any[]>([]);
  const [chatInfo, setChatInfo] = useState<any | null>(null);
  const [inputText, setInputText] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [myId, setMyId] = useState("");
  const flatListRef = useRef<FlatList>(null);

  // Carrega dados iniciais do chat
  useEffect(() => {
    (async () => {
      const token = await getItem("token_jwt");
      const response = await getChatById(token as string, chatId as string);
      setChatInfo(response.data.data.chat);
      setMessages(response.data.data.messages);
      setMyId(response.data.data.yourId);
    })();
  }, []);

  // Conecta ao socket e escuta novas mensagens
  useEffect(() => {
    if (!socket || !chatId) return;

    socket.emit("join_chat", { chatId });

    socket.on("new_message", (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("error_message", (payload: any) => {
      console.log(payload.error);
    });

    return () => {
      socket.off("new_message");
      socket.off("error_message");
    };
  }, [socket, chatId]);

  const sendMessage = () => {
    if (!inputText.trim() || !socket) return;

    socket.emit("send_message", {
      chatId,
      content: inputText,
    });

    setMessages((prevMessages) => [
      { content: inputText, sender: { _id: myId } },
      ...prevMessages,
    ]);

    setInputText("");
  };

  const loadMoreMessages = async () => {
    if (loadingMore || !hasMore || !messages?.length) return;

    setLoadingMore(true);
    const token = await getItem("token_jwt");
    const oldestMessage = messages[0];
    const beforeISO = oldestMessage?.createdAt
      ? new Date(oldestMessage.createdAt).toISOString()
      : undefined;

    try {
      const res = await getMessages(token!, chatId as string, beforeISO);
      const olderMessages = res.data.data;

      if (!olderMessages.length) {
        setHasMore(false);
      } else {
        setMessages((prev) => [...olderMessages, ...prev]);
      }
    } catch (err) {
      console.error("Erro ao carregar mensagens antigas", err);
    }

    setLoadingMore(false);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isOwnMessage = item.sender?._id === myId;

    return (
      <View
        style={{
          alignSelf: isOwnMessage ? "flex-end" : "flex-start",
          backgroundColor: theme["color-primary-500"],
          marginVertical: 4,
          padding: 10,
          maxWidth: "80%",
          borderRadius: 12,
          borderBottomRightRadius: isOwnMessage ? 0 : 12,
          borderBottomLeftRadius: isOwnMessage ? 12 : 0,
        }}
      >
        <Text style={{ color: "#fff" }}>{item.content}</Text>
      </View>
    );
  };

  if (!chatInfo) {
    return <Text>Carregando chat...</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme["background-basic-color-1"],
      }}
    >
      {/* Header */}
      <View
        style={{
          padding: 12,
          borderBottomColor: theme["text-hint-color"],
          borderBottomWidth: 0.5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: theme["text-hint-color"],
            marginRight: 20,
          }}
        />
        <Text category="h5">
          {chatInfo?.isGroup
            ? chatInfo.group?.name || "Grupo"
            : chatInfo.members[0]?.user?.username || "Usuário"}
        </Text>
      </View>

      {/* Chat + Input */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => item._id || index.toString()}
          inverted
          contentContainerStyle={{
            padding: 10,
          }}
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.1}
        />

        {/* Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            borderTopColor: theme["text-hint-color"],
            borderTopWidth: 0.5,
            backgroundColor: theme["background-basic-color-1"],
          }}
        >
          <Input
            value={inputText}
            onChangeText={setInputText}
            placeholder="Digite uma mensagem..."
            style={{ flex: 1, marginRight: 8 }}
            onSubmitEditing={sendMessage}
          />
          <Button size="small" onPress={sendMessage}>
            Enviar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
