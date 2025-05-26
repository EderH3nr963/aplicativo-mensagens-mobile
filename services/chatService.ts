import { ENDPOINTS } from "@/constants/Endpoints";
import axios from "axios";

export const getChats = (token: string) =>
  axios.get(ENDPOINTS.GET_CHATS, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export const getChatById = (token: string, chatId: string) =>
  axios.get(ENDPOINTS.GET_CHAT(chatId), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export async function getMessages(
  token: string,
  chatId: string,
  before?: string // ISO date string
) {
  return axios.get(`/chat/${chatId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { before },
  });
}
