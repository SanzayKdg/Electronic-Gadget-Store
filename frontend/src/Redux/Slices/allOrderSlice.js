import { createSlice } from "@reduxjs/toolkit";
const allOrdersSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    allOrdersRequest: (state) => {
      state.loading = true;
    },
    allOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    allOrdersFail: (state, action) => {
      state.loadig = false;
      state.error = action.payload;
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
  allOrdersRequest,
  allOrdersSuccess,
  allOrdersFail,
  clearErrors,
  clearMessage,
} = allOrdersSlice.actions;

export default allOrdersSlice.reducer;
