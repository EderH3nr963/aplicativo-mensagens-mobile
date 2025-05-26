import { SocketProvider } from "@/context/Algo";
import { IsLoggedContext } from "@/context/loggedContext";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { Icon, useTheme } from "@ui-kitten/components";
import { Tabs } from "expo-router";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

export default function AppRoutes() {
  const auth = useContext(IsLoggedContext);
  const theme = useTheme();

  useAuthCheck();

  if (!auth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#000000"} />
      </View>
    );
  }

  return (
    <SocketProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme["background-basic-color-1"],
          },
          tabBarIconStyle: {
            color: theme["color-primary"],
          },
        }}
      >
        <Tabs.Screen
          name="(chats)"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="message-circle-outline"
                fill={color}
                style={{ width: size, height: size }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="calls"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon
                name="phone-outline"
                fill={color}
                style={{ width: size, height: size }}
              />
            ),
          }}
        />
      </Tabs>
    </SocketProvider>
  );
}
