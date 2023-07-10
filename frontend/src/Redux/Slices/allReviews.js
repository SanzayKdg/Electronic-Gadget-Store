import { createSlice } from "@reduxjs/toolkit";
const allReviewsSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    allReviewsRequest: (state) => {
      state.loading = true;
    },
    allReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    allReviewsFail: (state, action) => {
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
  allReviewsRequest,
  allReviewsSuccess,
  allReviewsFail,
  clearErrors,
  clearMessage,
} = allReviewsSlice.actions;

export default allReviewsSlice.reducer;
