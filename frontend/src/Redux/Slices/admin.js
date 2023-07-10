import { createSlice } from "@reduxjs/toolkit";
// const token = sessionStorage.getItem("token");
const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isLogin = false;
      state.error = action.payload;
    },
    // clear error and message
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logoutSuccess,
  logoutFail,
  clearErrors,
  clearMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
