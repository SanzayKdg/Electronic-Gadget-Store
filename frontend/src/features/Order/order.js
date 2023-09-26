import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "../Api/api";

// ----------- ACTION STARTS HERE --------------

// Get All Orders

export const getAllOrdersAsync = createAsyncThunk(
  "orders/get-all-orders",
  async ({
    keyword = "",
    currentPage = 1,
    price = [0, 300000],
    orderStatus = "",
    method = "card",
  }) => {
    let link = `/admin/orders?keyword=${keyword}&page=${currentPage}&totalPrice[gte]=${price[0]}&totalPrice[lte]=${price[1]}`;

    if (orderStatus) {
      link = `/admin/orders?keyword=${keyword}&page=${currentPage}&totalPrice[gte]=${price[0]}&totalPrice[lte]=${price[1]}&orderStatus=${orderStatus}`;
    }
    if (method) {
      link = `/admin/orders?keyword=${keyword}&page=${currentPage}&totalPrice[gte]=${price[0]}&totalPrice[lte]=${price[1]}&paymentInfo.method=${method}`;
    }
    if (orderStatus && method) {
      link = `/admin/orders?keyword=${keyword}&page=${currentPage}&totalPrice[gte]=${price[0]}&totalPrice[lte]=${price[1]}&orderStatus=${orderStatus}&paymentInfo.method=${method}`;
    }
    const response = await api1.get(link);
    return response.data;
  }
);

// Get Order Detail

export const getOrderDetailAsync = createAsyncThunk(
  "orders/get-order-detail",
  async (orderId) => {
    const response = await api1.get(`/admin/order/${orderId}`);
    return response.data;
  }
);

// Update Order Status Action

export const updateOrderAsync = createAsyncThunk(
  "orders/update-order",
  async ({ orderId, status }) => {
    const response = await api1.put(`/admin/order/${orderId}`, { status });
    return response.data;
  }
);

// Delete Order Action

export const deleteOrderAsync = createAsyncThunk(
  "orders/delete-order",
  async (orderId) => {
    const response = await api.delete(`/admin/order/${orderId}`);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------
export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
    loading: false,
    error: null,
    success: false,
    orderCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.orderCount = action.payload.orderCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getAllOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetailAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(getOrderDetailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
