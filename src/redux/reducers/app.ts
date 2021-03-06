import { AnyAction } from "redux";
import { inititalState } from "../store/store";

export const AppRed = (state = inititalState.app, action: AnyAction) => {
  switch (action.type) {
    case "SET_FEED_SEARCH":
      return {
        ...state,
        feed: action.payload,
      };
    case "SET_DEF_FEED":
      return {
        ...state,
        feed: true,
      };
    default:
      return state;
  }
};
