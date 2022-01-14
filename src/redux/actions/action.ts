import { Dispatch } from "redux";
import { reduxItem, reduxTokens, singleChatType } from "../../types/reduxStore";
//  LOGOUT
export const handleUserLogout = () => {
  return async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: "CLEAR_USER",
    });
    dispatch({
      type: "CLEAR_TOKENS",
    });
    dispatch({
      type: "CLEAR_CHATS",
    });
    dispatch({
      type: "CLEAR_SHOP",
    });
    dispatch({
      type: "SET_DEF_FEED",
    });
  };
};
export const clearChat = () => ({
  type: "CLEAR_CHATS",
});
export const clearShop = () => ({
  type: "CLEAR_SHOP",
});
//
export const setUser = (value: string) => ({
  type: "SET_USER",
  payload: value,
});
export const setTokens = (value: reduxTokens) => ({
  type: "SET_TOKENS",
  payload: value,
});
export const setActiveChat = (value: singleChatType) => ({
  type: "SET_ACTIVE_CHAT",
  payload: value,
});
export const setChats = (value: singleChatType[]) => ({
  type: "SET_CHATS",
  payload: value,
});
export const setItemQty = (value: reduxItem, index: number) => {
  return async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const modifCart = state.shop.cart;
    modifCart[index] = value;
    dispatch({
      type: "SET_ITEM_QTY",
      payload: modifCart,
    });
  };
};
export const setDelItem = (index: number) => {
  return async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    const modifCart = state.shop.cart;
    modifCart.splice(index, 1);
    dispatch({
      type: "SET_ITEM_QTY",
      payload: modifCart,
    });
  };
};

// CHATS
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
        dispatch({
          type: "SET_ACTIVE_CHAT",
          payload: data[0],
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//  CART
export const addToCart = (value: any) => {
  return async (dispatch: Dispatch, getState: any) => {
    const state = getState();
    dispatch({
      type: "ADD_ITEM_CART",
      payload: value,
    });
    console.log(state);
    console.log(value);
  };
};
// FEED
export const setFeedSearch = (value: boolean) => ({
  type: "SET_FEED_SEARCH",
  payload: value,
});
