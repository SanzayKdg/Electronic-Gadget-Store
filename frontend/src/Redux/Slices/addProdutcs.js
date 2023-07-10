import { createSlice } from "@reduxjs/toolkit";

const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {},
  reducers: {
    addProductRequest: (state) => {
      state.loading = true;
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
      state.success = action.payload;
    },
    addProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.success = null;
    },
  },
});

export const {
  addProductRequest,
  addProductSuccess,
  addProductFail,
  clearErrors,
  clearMessage,
} = addProductSlice.actions;

export default addProductSlice.reducer;
