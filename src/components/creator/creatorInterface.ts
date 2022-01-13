import { CreatorType } from "../../types/creatorTypes";
import { reduxSingleOrder, reduxSingleItem } from "../../types/reduxStore";

export interface orderFetch {
  Order: reduxSingleOrder;
  reFetch: () => void;
}
export interface creatorFetch {
  reFetch: () => void;
  FetchedCreator: CreatorType;
}
export interface itemRefetch {
  reFetch: () => void;
  item: reduxSingleItem;
}
export interface itemInfoRefetch {
  reFetch: () => void;
  itemInfo: reduxSingleItem;
}
