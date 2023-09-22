import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/auth";
import orderReducer from "../features/Order/order";
import userReducer from "../features/User/user";
import productReducer from "../features/Products/products";

const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    user: userReducer,
    product: productReducer,
  },
});

export default store;
