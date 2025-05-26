import { customDarkTheme, customLightTheme } from "@/constants/Colors";
import IsLoggedProvider from "@/context/loggedContext";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isDarkMode, setIsDarkMode] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ApplicationProvider
      {...eva}
      theme={isDarkMode ? customDarkTheme : customLightTheme}
    >
      <IconRegistry icons={EvaIconsPack} />
      <IsLoggedProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(app)">
          <Stack.Screen name="(app)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
      </IsLoggedProvider>
    </ApplicationProvider>
  );
}
