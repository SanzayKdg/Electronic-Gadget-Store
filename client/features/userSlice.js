import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, api1, api2 } from "./api/api";

// ----------- ACTION STARTS HERE --------------
// get myProfile Action
export const getProfileAsync = createAsyncThunk("user/profile", async () => {
  const response = await api.get("/profile");
  return response.data;
});

// verify user Action
export const verifyAsync = createAsyncThunk("user/verify", async (otp) => {
  const response = await api.post("/verify", { otp });
  return response.data;
});

// update profile action
// update password action
// forgot password action

// ----------- ACTION ENDS HERE --------------

// ----------- SLICES STARTS HERE --------------
export const userSlice = createSlice({
  name: "verify",
  initialState: {
    loading: true,
    success: false,
    error: null,
    isAuthenticated: false,
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ----------- GET PROFILE --------------
      .addCase(getProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // ----------- VERIFY USER --------------
      .addCase(verifyAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(verifyAsync.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});
// ----------- UPDATE PROFILE --------------
// ----------- UPDATE PASSWORD --------------
// ----------- FORGOT PASSWORD --------------

export default userSlice.reducer;
