import { AnyAction } from "redux";
import { inititalState } from "../store/store";

export const ShopRed = (state = inititalState.shop, action: AnyAction) => {
  switch (action.type) {
    case "ADD_ITEM_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case "CLEAR_SHOP":
      return {
        cart: [],
        orders: [],
      };
    case "SET_ITEM_QTY":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
