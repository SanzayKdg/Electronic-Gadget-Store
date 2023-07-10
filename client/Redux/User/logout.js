import { createSlice } from "@reduxjs/toolkit";

export const logoutSlice = createSlice({
  name: "logout",
  initialState: {},
  reducers: {
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  logoutRequest,
  logoutSuccess,
  logoutFail,
  clearErrors,
  clearMessage,
} = logoutSlice.actions;

export default logoutSlice.reducer;
