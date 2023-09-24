import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, api1 } from "../Api/api";

// ----------- ACTION STARTS HERE --------------

// login action
export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await api1.post("/login", { email, password });

    return response.data;
  }
);

// logout action
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await api1.get("/logout");
  setTimeout(() => {
    window.location.reload();
  }, 400);
  return response.data;
});

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    error: null,
    isAuthenticated: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
