import { getChats } from "@/services/chatService";
import { Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { router } from "expo-router";
import { getItem } from "expo-secure-store";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function IndexPage() {
  const theme = useTheme();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const token = getItem("token_jwt");

        const { data } = await getChats(token as string);

        setChats(data.chats || []);
      } catch (e: any) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme["background-basic-color-1"],
        padding: 10,
        gap: 20,
      }}
    >
      <Input
        style={{ width: "100%", borderRadius: 15 }}
        accessoryLeft={<Icon name="search-outline" />}
        size="medium"
        placeholder={"Search"}
      />
      <ScrollView
        style={{
          flexGrow: 1,
          flex: 1,
          borderTopColor: theme["background-basic-color-2"],
          borderTopWidth: 1,
          paddingTop: 20,
        }}
      >
        <View style={{ gap: 20 }}>
          {chats.map((chat: any) => {
            const title = chat.isGroup
              ? chat.group?.name || "Grupo"
              : chat.members[0].user.username || "Usuário";

            const subtitle = chat.lastMessage?.text || "Sem mensagens";
            const unreadCount = chat.unreadMessages?.length || 0;

            return (
              <Pressable
                key={chat._id}
                onPress={() =>
                  router.push({
                    pathname: "/chat",
                    params: { chatId: chat._id },
                  } as any)
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: theme["background-basic-color-2"],
                    padding: 10,
                    borderRadius: 10,
                    marginBottom: 10, // opcional: para separar os itens da lista
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        backgroundColor: theme["text-hint-color"],
                        marginRight: 20,
                      }}
                    />
                    <View style={{ flexDirection: "column", maxWidth: 200 }}>
                      <Text category="h6">{title}</Text>
                      <Text
                        category="p1"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {subtitle}
                      </Text>
                    </View>
                  </View>

                  {unreadCount > 0 && (
                    <View
                      style={{
                        backgroundColor: theme["color-primary"],
                        padding: 5,
                        borderRadius: 15,
                        height: 30,
                        width: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ color: "#fff", textAlign: "center" }}>
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
