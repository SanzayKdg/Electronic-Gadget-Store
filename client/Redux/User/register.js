import { createSlice } from "@reduxjs/toolkit";
import { api1 } from "../axios";

export const registerSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
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
  registerRequest,
  registerSuccess,
  registerFail,
  clearErrors,
  clearMessage,
} = registerSlice.actions;
export default registerSlice.reducer;


