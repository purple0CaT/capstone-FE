import { inititalState } from "../store/store";

export const TokenRed = (state = inititalState.tokens, action: any) => {
  switch (action.type) {
    case "SET_TOKENS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
