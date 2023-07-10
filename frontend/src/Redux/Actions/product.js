import { api, api1 } from "./axios";
import {
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
} from "../Slices/getAllProducts";
import {
  addProductRequest,
  addProductSuccess,
  addProductFail,
} from "../Slices/addProdutcs";
import {
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
} from "../Slices/updateProduct";
import {
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
} from "../Slices/deleteProductSlices";

import {
  allReviewsRequest,
  allReviewsSuccess,
  allReviewsFail,
} from "../Slices/allReviews";

// add Product -- admin
export const addProduct = (productData) => async (dispatch) => {
  try {
    dispatch(addProductRequest());
    const { data } = await api1.post("/product/new", productData);
    dispatch(addProductSuccess(data));
  } catch (error) {
    dispatch(addProductFail(error.message));
  }
};

// get all products -- admin
export const allProducts = () => async (dispatch) => {
  try {
    dispatch(allProductsRequest());
    const { data } = await api.get("/admin/products");
    console.log(data);

    dispatch(allProductsSuccess(data));
  } catch (error) {
    dispatch(allProductsFail(error.message));
  }
};

// update Product -- admin
export const updateProduct = (productData, productId) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const { data } = await api1.put(`/product/${productId}`, productData);
    dispatch(updateProductSuccess(data));
  } catch (error) {
    dispatch(updateProductFail(error));
  }
};
// delete Product -- admin
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await api.delete(`/product/${productId}`);
    dispatch(deleteProductSuccess(data));
  } catch (error) {
    dispatch(deleteProductFail(error));
  }
};

// get all reviews -- admin
export const allreviews = (productId) => async (dispatch) => {
  try {
    dispatch(allReviewsRequest());
    const { data } = await api.get(`/product/reviews?id=${productId}`);
    dispatch(allReviewsSuccess(data));
  } catch (error) {
    dispatch(allReviewsFail(error.message));
  }
};
