export const BASE_URL = 'http://localhost:3000';
export const GET_CHATS_URL = `/chats`;
export const GET_CHAT_BY_ID_URL = (chatId: string) => `/chats/${chatId}`;
export const GET_MESSAGES_URL = `/messages`;
export const GET_MESSAGES_BY_CHAT_ID_URL = (chatId: string) => `/messages/${chatId}/messages`;
export const GET_USER_INFO_URL = `/users/me`;
export const REGISTER_URL = `/signup`;
export const LOGIN_URL = `/signin`;
export const LOGOUT_URL = `/signout`;
export const GET_MESSAGE_BY_CHAT_ID = (chatId: string, query?: string) =>
  `/message.get?chat_id=${chatId}&${query}`;
