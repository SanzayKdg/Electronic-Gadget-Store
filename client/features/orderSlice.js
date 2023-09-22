import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// ----------- CREATE ORDER --------------
export const getAllOrdersAsync = createAsyncThunk(
  "order/all-orders",
  async () => {
    const response = await api.get("/orders/my_orders");
    return response.data;
  }
);
// ----------- CREATE ORDER --------------
export const createOrder = createAsyncThunk(
  "order/new_order",
  async (orderItems) => {
    const response = await api1.post("/order/new", orderItems);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: true,
    order: {},
    orders: [],
    error: null,
    success: null,
  },

  extraReducers: (builder) => {
    builder
      // ----------- GET ORDER --------------
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- CREATE ORDER --------------
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.success = action.payload.success;
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default orderSlice.reducer;
