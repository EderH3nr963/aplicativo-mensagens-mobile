import { ENDPOINTS } from "@/constants/Endpoints";
import axios from "axios";

export const loginRequest = (email: string, password: string) =>
  axios.post(
    ENDPOINTS.LOGIN,
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000,
    }
  );

export const verify2faRequest = (email: string, code: string) =>
  axios.post(
    ENDPOINTS.VERIFY_2FA,
    { email, code },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000,
    }
  );

export const registerRequest = (form: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) =>
  axios.post(ENDPOINTS.VERIFY_2FA, form, {
    headers: { "Content-Type": "application/json" },
    timeout: 10_000,
  });

export const veirfyTokenRequest = (token: string) =>
  axios.get(ENDPOINTS.VERIFY_JWT_TOKEN, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 10_000,
  });
