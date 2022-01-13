import { AnyAction } from "redux";
import { inititalState } from "../store/store";

export const ChatRed = (state = inititalState.chat, action: AnyAction) => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        allChat: action.payload,
      };
    case "SET_ACTIVE_CHAT":
      return {
        ...state,
        activeChat: action.payload,
      };
    case "CLEAR_CHATS":
      return {
        allChat: [],
        activeChat: null,
      };
    default:
      return state;
  }
};
