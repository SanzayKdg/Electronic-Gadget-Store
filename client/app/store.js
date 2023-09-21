import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import shippingReducer from "../features/shippingSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    order: orderReducer,
    user : userReducer,
  },
});

export default store;
