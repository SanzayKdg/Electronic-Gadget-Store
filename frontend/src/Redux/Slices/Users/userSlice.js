import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, updateUser } from "../Api/UserApi";

const initialState = {
  users: [],
  user: {},
};

// ----------- ACTION STARTS HERE --------------

// Get All User Action

export const getAllUserAsync = createAsyncThunk(
  "users/get-all-users",
  async () => {
    const response = await getAllUsers();
    return response.data;
  }
);

// Update User Role Action

export const updateUserRoleAsync = createAsyncThunk(
  "users/update-user",
  async ({ userId, userData }) => {
    const response = await updateUser(userId, userData);
    return response.data;
  }
);

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRoleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateUserRoleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
