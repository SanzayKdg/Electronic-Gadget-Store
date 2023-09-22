import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "./api/api";

// ----------- ACTION STARTS HERE --------------
// ----------- ADD TO WISHLIST --------------
export const addToWishlist = createAsyncThunk("wishlist/add", async (item) => {
  const response = await api1.post("/wishlist/add", item);
  return response.data;
});

// ----------- GET ALL WISHLIST ITEMS --------------
export const getMyWishlist = createAsyncThunk(
  "wishlist/all",
  async (userId) => {
    const response = await api.get(`/wishlists/${userId}`);
    return response.data;
  }
);
// ----------- REMOVE FROM WISHLIST --------------
export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (itemId) => {
    const response = await api.delete(`/wishlist/${itemId}`);
    return response.data;
  }
);
// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------
export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: true,
    wishlist: {},
    wishlists: [],
    error: null,
    success: false,
    message: null,
  },

  extraReducers: (builder) => {
    builder
      // ----------- ADD ITEMS TO WISHLIST --------------
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ----------- GET ALL WISHLIST ITEMS --------------
      .addCase(getMyWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlists = action.payload.wishlists;
      })
      .addCase(getMyWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- DELETE WISHLIST ITEMS --------------
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
