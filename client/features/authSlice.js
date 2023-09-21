import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api2 } from "./api/api";

// ----------- ACTION STARTS HERE --------------

// register action
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (formData) => {
    const response = await api2.post("/register", formData);
    return response.data;
  }
);

// login action
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  }
);

// logout action
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await api.get("/logout");
  return response.data;
});

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    error: null,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------- REGISTER --------------
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.isAuthenticated = true;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- LOGIN --------------
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })

      // ----------- LOGOUT --------------
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = action.payload;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
