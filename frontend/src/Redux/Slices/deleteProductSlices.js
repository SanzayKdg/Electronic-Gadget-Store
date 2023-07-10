import { createSlice } from "@reduxjs/toolkit";

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {},
  reducers: {
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
    },
    deleteProductFail: (state, action) => {
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
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFail,
  clearErrors,
  clearMessage,
} = deleteProductSlice.actions;

export default deleteProductSlice.reducer;
