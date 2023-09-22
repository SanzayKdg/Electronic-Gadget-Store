import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1, api2 } from "../Api/api";

// ----------- ACTION STARTS HERE --------------
// Create a Product
export const createProductAsync = createAsyncThunk(
  "products/create-new",
  async (productData) => {
    const response = await api2.post("/product/new",  productData );
    return response.data;
  }
);

// Get all Products
export const getAllProductsAsync = createAsyncThunk(
  "products/get-all-products",
  async () => {
    const response = await api1.get("/admin/products");
    return response.data;
  }
);

// Delete A Product
export const deleteProductAsync = createAsyncThunk(
  "products/delete-product",
  async (productId) => {
    const response = api.delete(`/admin/product/${productId}`);
    return response.data;
  }
);

// Update A Product
export const updateProductAsync = createAsyncThunk(
  "products/update-product",
  async ({ productId, productData }) => {
    const response = await api2.put(`/admin/product/${productId}`, {
      productData,
    });
    return response.data;
  }
);
// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const productSlice = createSlice({
  name: "products",
  initialState: {
    users: [],
    user: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.success = action.payload.success;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
