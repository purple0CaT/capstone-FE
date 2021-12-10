import { inititalState } from "../store/store";

export const ShopRed = (state = inititalState.shop, action: any) => {
  switch (action.type) {
    case "ADD_ITEM_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};
