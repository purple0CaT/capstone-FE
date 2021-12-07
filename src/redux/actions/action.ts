
export const setUser = (value: any) => ({
  type: "SET_USER",
  payload: value,
});
export const clearUser = () => ({
  type: "CLEAR_USER",
});
export const setTokens = (value: any) => ({
  type: "SET_TOKENS",
  payload: value,
});
export const setActiveChat = (value: any) => ({
  type: "SET_ACTIVE_CHAT",
  payload: value,
});
export const setChats = (value: any) => ({
  type: "SET_CHATS",
  payload: value,
});
