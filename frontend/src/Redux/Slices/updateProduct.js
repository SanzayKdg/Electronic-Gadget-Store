import { createSlice } from "@reduxjs/toolkit";

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {},
  reducers: {
    updateProductRequest: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    updateProductFail: (state, action) => {
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
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  clearErrors,
  clearMessage,
} = updateProductSlice.actions;

export default updateProductSlice.reducer;
