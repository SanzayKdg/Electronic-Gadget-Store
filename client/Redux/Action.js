import { api, api1, api2 } from "./axios";
import { loginRequest, loginSuccess, loginFail } from "./User/login";
import { logoutFail, logoutRequest, logoutSuccess } from "./User/logout";
import { profileFail, profileRequest, profileSuccess } from "./User/profile";
import {
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
} from "./Product/allProducts";
import {
  registerFail,
  registerRequest,
  registerSuccess,
} from "./User/register";

import {
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
} from "./Product/productDetails";

// Authentication
// login
export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await api1.post("/login", { email, password });
    dispatch(loginSuccess(data));
    console.log("data aayo", data);
  } catch (error) {
    dispatch(loginFail(error.message));
    console.log("error chai aayo");
  }
};

// register
export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { data } = await api1.post("/register", formData);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.message));
  }
};

// profile
export const profileAction = () => async (dispatch) => {
  try {
    dispatch(profileRequest());
    const { data } = await api2.get(`/profile`);
    console.log("my data from action.js", data);
    dispatch(profileSuccess(data));
    console.log("my data.user from action.js", data.user);
  } catch (error) {
    dispatch(profileFail(error.message));
  }
};

// logout
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = api1.get("/logout");
    dispatch(logoutSuccess(data));
  } catch (error) {
    dispatch(logoutFail(error.message));
  }
};

// Authentication action ends here

// Products Action

// all Products
// export const allProductsAction =
//   (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
export const allProductsAction = () => async (dispatch) => {
  try {
    dispatch(allProductsRequest());
    // let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    // if (category) {
    //   link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    // }

    // const { data } = await api.get(link);
    const { data } = await api.get("/products");
    dispatch(allProductsSuccess(data));
  } catch (error) {
    dispatch(allProductsFail(error.message));
  }
};

// Product Details
export const productDetailsAction = (productId) => async (dispatch) => {
  try {
    dispatch(productDetailRequest());
    console.log("From action", productId);
    const { data } = await api.get(`/products/${productId}`);
    console.log(data, "From Action");
    dispatch(productDetailSuccess(data.product));
  } catch (error) {
    dispatch(productDetailFail(error.message));
  }
};
// Products Action ends here
