import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import shippingReducer from "../features/shippingSlice";
import orderReducer from "../features/orderSlice";
import userReducer from "../features/userSlice";
import wishlistReducer from "../features/wishlistSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    order: orderReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
