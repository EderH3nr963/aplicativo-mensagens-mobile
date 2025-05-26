import { IAlert } from "@/app/(auth)/register";
import { emailRegex } from "@/constants/Regex";
import axios from "axios";
import { navigate } from "expo-router/build/global-state/routing";

interface IForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function useRegister() {
  const register = async (
    form: IForm,
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>,
    disabledButton: boolean,
    setAlert: React.Dispatch<React.SetStateAction<IAlert | null>>
  ) => {
    if (!form.username || !form.email || !form.password) {
      return setAlert({
        type: "danger",
        message: "Preencha todos os campos obrigatórios",
      });
    }

    if (!emailRegex.test(form.email)) {
      return setAlert({ type: "danger", message: "Formato de email inválido" });
    }

    if (form.password.length < 8) {
      return setAlert({
        type: "danger",
        message: "A senha deve conter entre 8 a 17 caracteres",
      });
    }

    if (form.password !== form.confirmPassword) {
      return setAlert({ type: "danger", message: "As senhas não coincidem" });
    }

    setDisabledButton(!disabledButton);

    try {
      const res = await axios.post(
        "http://192.168.0.8:3000/api/v1/auth/register",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10 * 1000,
        }
      );

      if (res.data.status !== "success") throw new Error(res.data.msg);

      setAlert({
        type: "success",
        message: res.data.message,
      });
      setTimeout(() => navigate("/(auth)/login"), 1000);
    } catch (e: any) {
      setAlert({
        message:
          e.response.data.message ||
          e.message ||
          "Erro inesperado ao fazer o cadastro",
        type: "danger",
      });
    } finally {
      setDisabledButton(disabledButton);
    }
  };

  return { register };
}
