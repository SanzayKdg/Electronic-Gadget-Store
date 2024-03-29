import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// get all products action

export const getAllProducts = createAsyncThunk(
  "products/all",
  async ({ keyword = "", price = [0, 300000], category, ratings = 0 }) => {
    let link = `/products?keyword=${
      keyword === undefined ? "" : keyword
    }&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/products?keyword=${
        keyword === undefined ? "" : keyword
      }&price[gte]=${price[0]}&price[lte]=${
        price[1]
      }&category=${category}&ratings[gte]=${ratings}`;
    }
    const response = await api.get(link);
    return response.data;
  }
);

// get single product action

export const getSingleProduct = createAsyncThunk(
  "products/single",
  async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

// get recommend products from algorithm
export const getRecommendedProducts = createAsyncThunk(
  "products/recommend",
  async (id) => {
    const response = await api.get(`/product/recommend/${id}`);
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
      })
      .addCase(getRecommendedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecommendedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.recommend = action.payload.recommend;
      })
      .addCase(getRecommendedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
