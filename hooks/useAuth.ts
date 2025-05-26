import { IAlert } from "@/app/(auth)/register";
import { ERROR_MESSAGES } from "@/constants/Messages";
import { emailRegex } from "@/constants/Regex";
import {
  loginRequest,
  registerRequest,
  verify2faRequest,
} from "@/services/authService";
import { navigate, replace } from "expo-router/build/global-state/routing";
import * as SecureStore from "expo-secure-store";
import React from "react";

interface IFormLogin {
  email: string;
  password: string;
  code?: string;
}

interface IFormRegister {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuth = () => {
  const login = async (
    form: IFormLogin,
    setDisabledButton: (state: boolean) => void,
    setAlert: React.Dispatch<React.SetStateAction<IAlert | null>>,
    setStep: (step: 1 | 2) => void
  ) => {
    const { email, password } = form;

    if (!email || !password) {
      setAlert({ type: "danger", message: ERROR_MESSAGES.FILL_FIELDS });
      return;
    }

    if (!emailRegex.test(email)) {
      setAlert({ type: "danger", message: ERROR_MESSAGES.INVALID_EMAIL });
      return;
    }

    setDisabledButton(true);

    try {
      const { data } = await loginRequest(email, password);

      if (data.status === "2fa_required") return setStep(2);

      if (data.status !== "success") {
        setAlert({
          type: "danger",
          message: data.message || ERROR_MESSAGES.LOGIN_FAILED,
        });
        return;
      }

      await SecureStore.setItemAsync("token_jwt", data.token);
      setAlert({ type: "success", message: data.message });
      setTimeout(() => replace("/(app)"), 1000);
    } catch (error: any) {
      console.log(error.message);
      const msg = error?.response?.data?.message || ERROR_MESSAGES.LOGIN_FAILED;
      setAlert({ type: "danger", message: msg });
    } finally {
      setDisabledButton(false);
    }
  };

  const login2fa = async (
    form: IFormLogin,
    setDisabledButton: (state: boolean) => void,
    setAlert: React.Dispatch<React.SetStateAction<IAlert | null>>
  ) => {
    const { email, code } = form;

    if (!code || code.length < 6 || code.length > 6) {
      setAlert({ type: "danger", message: ERROR_MESSAGES.INVALID_2FA });
      return;
    }

    setDisabledButton(true);

    try {
      const { data } = await verify2faRequest(email, code);

      if (data.status !== "success") {
        setAlert({
          type: "danger",
          message: data.message || ERROR_MESSAGES.VERIFY_2FA_FAILED,
        });
        return;
      }

      await SecureStore.setItemAsync("token_jwt", data.token);
      replace("/(app)");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || ERROR_MESSAGES.VERIFY_2FA_FAILED;
      setAlert({ type: "danger", message: msg });
    } finally {
      setDisabledButton(false);
    }
  };

  const register = async (
    form: IFormRegister,
    setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>,
    setAlert: React.Dispatch<React.SetStateAction<IAlert | null>>
  ) => {
    if (!form.username || !form.email || !form.password) {
      return setAlert({
        type: "danger",
        message: ERROR_MESSAGES.FILL_FIELDS,
      });
    }

    if (!emailRegex.test(form.email)) {
      return setAlert({
        type: "danger",
        message: ERROR_MESSAGES.INVALID_EMAIL,
      });
    }

    if (form.password.length < 8) {
      return setAlert({
        type: "danger",
        message: ERROR_MESSAGES.LIMIT_LENGTH_PASS,
      });
    }

    if (form.password !== form.confirmPassword) {
      return setAlert({ type: "danger", message: "As senhas não coincidem" });
    }

    setDisabledButton(true);

    try {
      const { data } = await registerRequest(form);

      if (data.status !== "success") throw new Error(data.msg);

      setAlert({
        type: "success",
        message: data.message,
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
      setDisabledButton(false);
    }
  };

  return { login, login2fa, register };
};
