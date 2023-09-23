import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// get all products action

export const getAllProducts = createAsyncThunk("products/all", async () => {
  const response = await api.get("/products");
  return response.data;
});

// get single product action

export const getSingleProduct = createAsyncThunk(
  "product/single",
  async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------
export const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: true,
    products: [],
    product: {},
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
