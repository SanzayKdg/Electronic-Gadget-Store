import { combineReducers, configureStore } from "@reduxjs/toolkit";
import registerReducer from "./User/register";
import loginReducer from "./User/login";
import profileReducer from "./User/profile";
import logoutReducer from "./User/logout";
import allProductsReducer from "./Product/allProducts";
import productDetailsReducer from "./Product/productDetails";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// combine reducer
// const reducer = combineReducers({
//   register: registerReducer,
//   login: loginReducer,
//   profile: profileReducer,
//   logout: logoutReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  // reducer: persistedReducer,
  reducer: {
    registerUser: registerReducer,
    login: loginReducer,
    profile: profileReducer,
    logout: logoutReducer,
    allProducts: allProductsReducer,
    productDetail: productDetailsReducer,
  },
});

export default store;
