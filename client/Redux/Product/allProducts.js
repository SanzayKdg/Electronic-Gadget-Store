import { createSlice } from "@reduxjs/toolkit";

export const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {},
  reducers: {
    allProductsRequest: (state) => {
      state.loading = true;
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    allProductsFail: (state, action) => {
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
  allProductsRequest,
  allProductsSuccess,
  allProductsFail,
  clearErrors,
  clearMessage,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
