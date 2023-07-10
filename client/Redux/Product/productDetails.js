import { createSlice } from "@reduxjs/toolkit";

export const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {},
  reducers: {
    productDetailRequest: (state) => {
      state.loading = true;
    },
    productDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  productDetailRequest,
  productDetailSuccess,
  productDetailFail,
  clearErrors,
  clearMessage,
} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;

const p = 
  {
    product: {
      __v: 1,
      _id: "648d99151f1405b8a7446daf",
      category: "Samsung",
      createdAt: "2023-06-17T11:29:25.097Z",
      description: "Test Product 1",
      images: [[Object], [Object], [Object], [Object]],
      name: "Samsung Galaxy A13 6GB/128GB",
      noOfReviews: 1,
      price: 24500,
      ratings: 5,
      reviews: [[Object]],
      stock: 5,
    },
    success: true,
  }
;
