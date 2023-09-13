import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// ----------- CREATE ORDER --------------
export const createOrder = createAsyncThunk("order/new", async (orderItems) => {
  const response = await api1.post("/order/new", orderItems);
  return response.data;
});

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    order: {},
    error: null,
    success: false,
  },

  extraReducers: (builder) => {
    builder
      // ----------- GET ALL CART ITEMS --------------
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
