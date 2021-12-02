import { inititalState } from "../store/store";

export const UserRed = (state = inititalState.user, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_USER":
      return {
        _id: "",
      };
    default:
      return state;
  }
};
