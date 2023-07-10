import { createSlice } from "@reduxjs/toolkit";
const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {},
  reducers: {
    allProductsRequest: (state) => {
      state.loading = true;
    },
    allProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
    allProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    // clear error and message
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
