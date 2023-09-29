import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------
// add new review and rating
export const newReviewAsync = createAsyncThunk(
  "review/new",
  async (reviewData) => {
    const response = await api1.put("/product/review/new", reviewData);
    return response.data;
  }
);
// add new review and rating
export const getReviewsAsync = createAsyncThunk("review/all", async (id) => {
  const response = await api.get(`/product/reviews?id=${id}`);
  return response.data;
});

// ----------- ACTION ENDS HERE --------------
// ----------- SLICES STARTS HERE --------------
export const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: true,
    reviews: [],
    error: null,
    success: false,
  },
  extraReducers: (builder) => {
    builder
      // ----------- GET REVIEWs REDUCER --------------

      .addCase(newReviewAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(newReviewAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(newReviewAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- GET REVIEWs REDUCER --------------

      .addCase(getReviewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getReviewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default reviewSlice.reducer;
