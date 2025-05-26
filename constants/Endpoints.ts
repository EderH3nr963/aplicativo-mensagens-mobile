export const API_BASE_URL =
  process.env.URL_API || "http://192.168.0.10:3000/api/v1";

export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  VERIFY_2FA: `${API_BASE_URL}/verify-login-2fa`,
  RESEND_2FA: (email: string) =>
    `${API_BASE_URL}/auth/resend-login-2fa/${email}`,
  REGISTER: `${API_BASE_URL}/register`,
  VERIFY_JWT_TOKEN: `${API_BASE_URL}/auth/verify-token`,
  GET_CHATS: `${API_BASE_URL}/chat/`,
  GET_CHAT: (id_chat: string) => `${API_BASE_URL}/chat/${id_chat}`,
  GET_MESSAGES_CHAT: (id_chat: string) =>
    `${API_BASE_URL}/chat/${id_chat}/messages`,
};
