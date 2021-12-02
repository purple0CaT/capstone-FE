import { inititalState } from "../store/store";

export const UserRed = (state = inititalState.user, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
