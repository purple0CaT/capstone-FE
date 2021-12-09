import { inititalState } from "../store/store";

export const TokenRed = (state = inititalState.tokens, action: any) => {
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
