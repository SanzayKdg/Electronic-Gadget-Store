import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1, api2 } from "../Api/api";

// ----------- ACTION STARTS HERE --------------
// Create a Product
export const createProductAsync = createAsyncThunk(
  "products/create-new",
  async (productData) => {
    const response = await api2.post("/product/new", productData);
    return response.data;
  }
);

// Get all Products
export const getAllProductsAsync = createAsyncThunk(
  "products/get-all-products",
  async ({
    keyword = "",
    currentPage = 1,
    price = [0, 300000],
    category,
    ratings = 0,
  }) => {
    let link = `/admin/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      link = `/admin/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    const response = await api1.get(link);
    return response.data;
  }
);

// Get Single Product
export const getSingleProductAsync = createAsyncThunk(
  "product/single",
  async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
);

// Delete A Product
export const deleteProductAsync = createAsyncThunk(
  "products/delete-product",
  async (productId) => {
    const response = api1.delete(`/product/${productId}`);
    return response.data;
  }
);

// Update A Product
export const updateProductAsync = createAsyncThunk(
  "products/update-product",
  async ({ productId, productData }) => {
    const response = await api2.put(`/product/${productId}`, productData);
    return response.data;
  }
);

// Get All Reviews of a product
export const getAllReviewsAsync = createAsyncThunk(
  "products/reviews",
  async (product_id) => {
    const response = await api1.get(`/product/reviews?id=${product_id}`);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
    success: false,
    reviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------- ADD PRODUCT --------------
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

      // ----------- GET ALL PRODUCTS --------------
      .addCase(getAllProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        state.resultPerPage = action.payload.resultPerPage;
      })
      .addCase(getAllProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- GET SINGLE PRODUCTS --------------
      .addCase(getSingleProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getSingleProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------- UPDATE PRODUCT --------------
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------- DELETE PRODUCT --------------
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------- GET REVIEWS OF A PRODUCT --------------
      .addCase(getAllReviewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
      })
      .addCase(getAllReviewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
