export interface reduxSingleItem {
  _id: string;
  image: string;
  sellerId: string;
  title: string;
  imgRatio: string;
  completed: boolean;
  description: string;
  deliveryCode?: string;
  price: number
  quantity: number;
  type: string;
  __v: number;
}
export interface reduxItem {
  item: reduxSingleItem;
  qty: number;
}
//
export interface reduxOrders {
  completed: boolean;
  createdAt: string;
  customerId: string;
  deliveryAddress: string;
  deliveryCodeTracking: null | string;
  items: reduxItem[];
  paid: boolean;
  totalCost: number;
  updatedAt: string;
  __v: number;
  _id: string;
}
//
export interface reduxShop {
  shop: { cart: reduxItem[]; orders: reduxOrders[] };
}
// === Booking ===
export interface reduxBooking {
  _id: string;
  appointmentDate: string;
  appointmentEnd: string;
  user: string;
  confirmed: boolean;
  rejected: boolean;
  __v: number;
}
// === Chat ===
export interface chatMember {
  _id: string;
  firstname: string;
  lastname: string;
  avatar: string;
}
//
export interface chatHistory {
  sender: {
    _id: string;
    firstname: string;
    lastname: string;
    avatar: string;
    message: string;
  };
  _id: string;
  updatedAt: string;
  createdAt: string;
}
//
export interface singleChat {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  members: chatMember[];
  history: chatHistory[] | [];
}
// === Tokens ===
export interface reduxTokens {
  accessToken: string | null;
  refreshToken: string | null;
}
// Store
export interface ReduxStore extends reduxShop {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    googleId: string;
    fbId: string;
    creator: string;
    type: string;
    booking: reduxBooking[];
    followers: string;
    shopping: {
      cart: reduxItem[] | [];
      orders: reduxOrders[] | [];
    };
  };
  chat: {
    activeChat: singleChat | {};
    allChat: singleChat[] | [];
  };
  app: {
    feed: boolean;
  };
  tokens: reduxTokens;
}
