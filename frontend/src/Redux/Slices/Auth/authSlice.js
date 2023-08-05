import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../Api/AuthApi";

const initialState = {
  user: {},
};

// ----------- ACTION STARTS HERE --------------

// login action
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await login(email, password);
    return response.data;
  }
);

// logout action
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await logout();
  localStorage.removeItem("persist:root");
  return response.data;
});

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.success = action.payload;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
