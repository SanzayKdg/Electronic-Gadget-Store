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

import loginReducer from "./Slices/login";
import allUsersReducer from "./Slices/getAllUsers";
import allProductsReducer from "./Slices/getAllProducts";
import addProdutcsReducer from "./Slices/addProdutcs";
import logoutReducer from "./Slices/logout";
import updateProductReducer from "./Slices/updateProduct";
import deleteProductReducer from "./Slices/deleteProductSlices";
import allOrderReducer from "./Slices/allOrderSlice";
import updateOrderReducer from "./Slices/updateOrder";
import updateUserReducer from "./Slices/updateUser";
import allReviewsReducer from "./Slices/allReviews";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// All reducer combined
const reducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  // product: productReducer,
  // order: orderReducer,
  // login: loginReducer,
  // logout: logoutReducer,
  // allUsers: allUsersReducer,
  // allProducts: allProductsReducer,
  // addProduct: addProdutcsReducer,
  // updateProduct: updateProductReducer,
  // deleteProduct: deleteProductReducer,
  // allOrder: allOrderReducer,
  // updateOrder: updateOrderReducer,
  // updateUser: updateUserReducer,
  // allReviews: allReviewsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }),

  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer,

    // login: loginReducer,
    // logout: logoutReducer,
    // allUsers: allUsersReducer,
    // allProducts: allProductsReducer,
    // addProduct: addProdutcsReducer,
    // updateProduct: updateProductReducer,
    // deleteProduct: deleteProductReducer,
    // allOrder: allOrderReducer,
    // updateOrder: updateOrderReducer,
    // updateUser: updateUserReducer,
    // allReviews: allReviewsReducer,
  },
});

export default store;

// may require later
