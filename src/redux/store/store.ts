import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import { ReduxStore } from "../../types/reduxStore";
import { AppRed } from "../reducers/app";
import { ChatRed } from "../reducers/chat";
import { ShopRed } from "../reducers/shop";
import { TokenRed } from "../reducers/tokens";
import { UserRed } from "../reducers/user";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const inititalState: ReduxStore = {
  user: {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    avatar: "",
    googleId: "",
    fbId: "",
    creator: "",
    type: "user",
    booking: [],
    followers: "",
    shopping: {
      cart: [],
      orders: [],
    },
  },
  shop: { cart: [], orders: [] },
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
  chat: {
    activeChat: {},
    allChat: [],
  },
  app: {
    feed: true,
  },
};

const Reducer = combineReducers({
  user: UserRed,
  shop: ShopRed,
  chat: ChatRed,
  tokens: TokenRed,
  app: AppRed,
});
const persistConfigs = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEYENCRIPT!,
      onError: function (error) {},
    }),
  ],
};
const persistedReducer = persistReducer(persistConfigs, Reducer);
const configureStore: any = createStore(
  persistedReducer,
  inititalState,
  composeEnhancers(applyMiddleware(thunk)),
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
