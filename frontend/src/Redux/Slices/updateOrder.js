import { createSlice } from "@reduxjs/toolkit";

const updateOrderSlice = createSlice({
  name: "updateOrder",
  initialState: {},
  reducers: {
    updateOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload
    },
    updateOrderFail: (state, action) => {
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
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearErrors,
  clearMessage,
} = updateOrderSlice.actions;

export default updateOrderSlice.reducer;
