import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./Slices/admin";
import {
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
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
  admin: adminReducer,
  logout: logoutReducer,
  allUsers: allUsersReducer,
  allProducts: allProductsReducer,
  addProduct: addProdutcsReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  allOrder: allOrderReducer,
  updateOrder: updateOrderReducer,
  updateUser: updateUserReducer,
  allReviews: allReviewsReducer,
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
});

export default store;
