import { AnyAction } from "redux";
import { inititalState } from "../store/store";

export const TokenRed = (state = inititalState.tokens, action: AnyAction) => {
  switch (action.type) {
    case "SET_TOKENS":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_TOKENS":
      return {
        accessToken: "",
        refreshToken: "",
      };
    default:
      return state;
  }
};
