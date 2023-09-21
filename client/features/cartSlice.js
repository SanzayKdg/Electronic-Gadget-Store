import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// ----------- GET ALL CART ITEMS --------------
export const getCartItems = createAsyncThunk("cart/all", async (userId) => {
  const response = await api.get(`/carts/${userId}`);
  return response.data;
});

// ----------- ADD ITEMS TO CART --------------
export const addToCart = createAsyncThunk("cart/add", async (cartItem) => {
  const response = await api1.post("/cart/new", cartItem);
  return response.data;
});

// ----------- UPDATE CART ITEMS --------------
export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartId, quantity }) => {
    const response = await api.put(`cart/${cartId}`, { quantity });
    return response.data;
  }
);

// ----------- DELETE CART ITEMS --------------
export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async (cartId) => {
    const response = await api.delete(`cart/${cartId}`);
    return response.data;
  }
);

// ----------- DELETE ALL CART ITEMS --------------
export const deleteAllCartItem = createAsyncThunk(
  "cart/delete/all",
  async (userId) => {
    const response = await api.delete(`carts/${userId}`);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: true,
    cart: {},
    carts: [],
    error: null,
    success: false,
  },

  extraReducers: (builder) => {
    builder
      // ----------- GET ALL CART ITEMS --------------
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.carts;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- ADD ITEMS TO CART --------------
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- UPDATE CART ITEMS --------------
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
        state.success = action.payload.success;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- DELETE CART ITEMS --------------
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- DELETE ALL CART ITEMS --------------
      .addCase(deleteAllCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteAllCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default cartSlice.reducer;
