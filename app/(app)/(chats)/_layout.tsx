import { Stack } from "expo-router";

export default function AuthRoutes() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="chats">
      <Stack.Screen name="chat" />
      <Stack.Screen name="chats" />
    </Stack>
  );
}
