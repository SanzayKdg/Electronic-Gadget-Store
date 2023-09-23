import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1, api2 } from "../Api/api";

// ----------- ACTION STARTS HERE --------------

// Get All User Action
export const getAllUserAsync = createAsyncThunk("users/all", async () => {
  const response = await api1.get("/admin/users");
  return response.data;
});

// Get Single User Action
export const getUserAsync = createAsyncThunk(
  "users/get-user",
  async (userId) => {
    const response = await api1.get(`/admin/user/${userId}`);
    return response.data;
  }
);

// Update User Role Action
export const updateUserRoleAsync = createAsyncThunk(
  "users/update",
  async ({ userId, userData }) => {
    const response = await api1.put(`/admin/user/${userId}`, userData);
    return response.data;
  }
);
// Delete User Action
export const deleteUserAsync = createAsyncThunk(
  "users/delete",
  async (userId) => {
    const response = await api1.delete(`/admin/user/${userId}`);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    loading: true,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getAllUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRoleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUserRoleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
