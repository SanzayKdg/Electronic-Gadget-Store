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
export const updateProfileAsync = createAsyncThunk(
  "user/update-profile",
  async (formData) => {
    const response = await api2.put("/profile/update", formData);
    return response.data;
  }
);

// change password action
export const changePasswordAsync = createAsyncThunk(
  "user/changePassword",
  async (formData) => {
    const response = await api.put("/password/update", formData);
    return response.data;
  }
);

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
      })
      // ----------- UPDATE PROFILE --------------
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ----------- CHANGE PASSWORD --------------
      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // ----------- FORGOT PASSWORD --------------
  },
});

export default userSlice.reducer;
