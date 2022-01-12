export interface reduxCart {
  item: {
    _id: string;
    image: string;
    sellerId: string;
    title: string;
    imgRatio: string;
    completed: boolean;
    description: string;
    price: number;
    quantity: number;
    type: string;
    __v: number;
  };
  qty: number;
}
//
export interface reduxOrders {
  completed: boolean;
  createdAt: string;
  customerId: string;
  deliveryAddress: string;
  deliveryCodeTracking: null | string;
  items: reduxCart[];
  paid: boolean;
  totalCost: number;
  updatedAt: string;
  __v: number;
  _id: string;
}
//
export interface reduxShop {
  shop: { cart: reduxCart[]; orders: reduxOrders[] };
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
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}
// Store
export interface ReduxStore extends reduxTokens, reduxShop {
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
    booking: string;
    followers: string;
    shopping: {
      cart: reduxCart[] | [];
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
}
