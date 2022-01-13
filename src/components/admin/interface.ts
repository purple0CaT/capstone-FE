import { reduxSingleOrder } from "../../types/reduxStore";

export interface ConfirmedType {
  Order: reduxSingleOrder[];
  reFetch: () => void;
}
export interface SingleOrder {
  Order: reduxSingleOrder;
  reFetch: () => void;
}
