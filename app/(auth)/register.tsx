import ModalAlert from "@/components/modalAlert";
import { RenderEyeIcon } from "@/components/renderIcon";
import useBackButtonHandler from "@/components/useBackButtonHandlerLogin";
import { useAuth } from "@/hooks/useAuth";
import useForm from "@/hooks/useForm";
import { Button, Input, Text, useTheme } from "@ui-kitten/components";
import { replace } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface IAlert {
  message: string;
  type: "danger" | "success" | "warning";
}

export default function RegisterScreen() {
  const theme = useTheme();
  const [secureEntry, setSecureEntry] = useState<boolean>(true);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [alert, setAlert] = useState<IAlert | null>(null);

  const toggleSecureEntry = (): void => {
    setSecureEntry(!secureEntry);
  };

  const { register } = useAuth();

  useBackButtonHandler(step, setStep);

  const { form, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme["color-primary"],
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: theme["background-basic-color-1"],
              padding: 30,
              justifyContent: "center",
              gap: 50,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Text category="h1">Seja bem-vindo!</Text>
            <View style={{ gap: 40 }}>
              <Input
                label={"Nome de usuário"}
                placeholder="Digite seu nome de usuário"
                style={styles.input}
                maxLength={50}
                size="large"
                onChangeText={(text) => handleChange("username", text)}
              />
              <Input
                label={"Email"}
                placeholder="Digite seu e-mail"
                style={styles.input}
                maxLength={50}
                size="large"
                onChangeText={(text) => handleChange("email", text)}
              />
              <Input
                label={"Senha"}
                style={styles.input}
                placeholder="Digite sua senha"
                size="large"
                maxLength={17}
                secureTextEntry={secureEntry}
                accessoryRight={(props) => (
                  <RenderEyeIcon
                    {...props}
                    secureEntry={secureEntry}
                    toggleSecureEntry={toggleSecureEntry}
                  />
                )}
                onChangeText={(text) => handleChange("password", text)}
              />
              <Input
                label={"Confirmar Senha"}
                style={styles.input}
                placeholder="Digite sua senha novamente"
                size="large"
                maxLength={17}
                secureTextEntry={secureEntry}
                onChangeText={(text) => handleChange("confirmPassword", text)}
              />
            </View>
            <Button
              style={styles.button}
              disabled={disabledButton}
              onPress={() => register(form, setDisabledButton, setAlert)}
            >
              <Text style={{ fontSize: 14 }}>Cadastrar</Text>
            </Button>
            <Pressable onPress={() => replace("/(auth)/login")}>
              <Text>Já possui conta? Clique aqui!</Text>
            </Pressable>
            {alert && <ModalAlert msg={alert.message} type={alert.type} />}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    fontSize: 24,
  },
  button: {
    borderRadius: 40,
  },
});
