import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./Slices/Auth/authSlice";
import orderReducer from "./Slices/Orders/orderSlice";
import productReducer from "./Slices/Products/productSlice";
import userReducer from "./Slices/Users/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// All reducer combined
const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
});

// const persistedReducer = persistReducer(persistConfig, reducer);
// const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore({
  // reducer: persistedReducer,
  // preloadedState,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
  //     },
  //   }),

  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;

// may require later
