import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------
export const addShippingDetails = createAsyncThunk(
  "shipping/add",
  async (addShippingDetails) => {
    const response = await api1.post("/shipping/new", addShippingDetails);

    return response.data;
  }
);

export const getShippingDetails = createAsyncThunk(
  "shipping/detail",
  async (id) => {
    const response = await api1.get(`/shipping-detail/${id}`);

    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    error: null,
    loading: true,
    shipppingDetail: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addShippingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(addShippingDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.shipping = action.payload;
      })
      .addCase(addShippingDetails.rejected, (state) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getShippingDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShippingDetails.fulfilled, (state) => {
        state.loading = false;
        state.shipppingDetail = action.payload;
      })
      .addCase(getShippingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shippingSlice.reducer;
