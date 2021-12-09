import { Dispatch } from "redux";

export const setUser = (value: any) => ({
  type: "SET_USER",
  payload: value,
});
export const clearUser = () => ({
  type: "CLEAR_USER",
});
export const clearToken = () => ({
  type: "CLEAR_TOKENS",
});
export const clearChat = () => ({
  type: "CLEAR_CHATS",
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

//
export const loadAllUserChats = () => {
  return async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const url = `${process.env.REACT_APP_FETCHURL}/chat/userChats`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${state.tokens.accessToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "SET_CHATS",
          payload: data,
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
