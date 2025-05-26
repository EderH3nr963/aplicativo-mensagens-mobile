import FormLogin from "@/components/formLogin";
import { useTheme } from "@ui-kitten/components";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

export default function LoginScreen() {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1, backgroundColor: theme["color-primary"] }}>
          <View
            style={{
              backgroundColor: theme["background-basic-color-1"],
              flex: 1,
              borderTopEndRadius: 50,
              padding: 30,
              justifyContent: "center",
              gap: 50,
              marginTop: 120,
            }}
          >
            <FormLogin />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
