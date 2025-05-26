import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Text } from "@ui-kitten/components";
import axios from "axios";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ModalAlert from "./modalAlert";
import { RenderEyeIcon } from "./renderIcon";
import useBackButtonHandler from "./useBackButtonHandlerLogin";

export interface IAlert {
  message: string;
  type: "danger" | "success" | "warning";
}

export default function FormLogin() {
  const { login, login2fa } = useAuth();
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [secureEntry, setSecureEntry] = useState(true);
  const [disabledButton, setDisabledButton] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    code: "",
  });

  const [step, setStep] = useState<1 | 2>(1);

  useBackButtonHandler(step, setStep);

  const toggleSecureEntry = () => setSecureEntry(!secureEntry);

  return (
    <>
      {step === 1 ? (
        <>
          <Text category="h1" style={{ marginBottom: 20 }}>
            Olá, novamente!
          </Text>
          <View style={{ gap: 40 }}>
            <Input
              label={"Email"}
              placeholder="Digite seu e-mail"
              style={styles.input}
              maxLength={50}
              size="large"
              onChangeText={(text) => setForm({ ...form, email: text })}
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
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
          </View>
          <Button
            style={styles.button}
            disabled={disabledButton}
            onPress={() => login(form, setDisabledButton, setAlert, setStep)}
          >
            <Text style={{ fontSize: 14 }}>Entrar</Text>
          </Button>
          <Pressable onPress={() => navigate("/(auth)/register")}>
            <Text>Não possui conta? Clique aqui!</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View>
            <Text category="h1" style={{ marginBottom: 20 }}>
              {"Verificação\n de duas etapas"}
            </Text>
            <Text>Enviamos um código de verificação para seu email</Text>
          </View>
          <View style={{ gap: 40 }}>
            <Input
              label={"Código de verificação"}
              placeholder=""
              style={styles.input}
              maxLength={6}
              size="large"
              onChangeText={(text) => setForm({ ...form, code: text })}
            />
          </View>
          <Button
            style={styles.button}
            onPress={() =>
              disabledButton
                ? null
                : login2fa(form, setDisabledButton, setAlert)
            }
          >
            <Text style={{ fontSize: 14 }}>Entrar</Text>
          </Button>
          <Pressable
            onPress={() =>
              axios.get(
                `https://192.168.0.8:3000/api/v1/auth/resend-login-2fa/${form.email}`
              )
            }
          >
            <Text>Reenviar código</Text>
          </Pressable>
        </>
      )}
      {alert && <ModalAlert msg={alert.message} type={alert.type} />}
    </>
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
