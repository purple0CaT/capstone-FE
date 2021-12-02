import { Dispatch } from "redux";

export const setUser = (value: any) => ({
  type: "SET_USER",
  payload: value,
});
export const setTokens = (value: any) => ({
  type: "SET_TOKENS",
  payload: value,
});
