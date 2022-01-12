import { reduxOrders } from "../../types/reduxStore";

export interface ConfirmedType {
  Order: reduxOrders[];
  reFetch: () => void;
}
export interface SingleOrder {
  Order: reduxOrders;
  reFetch: () => void;
}
