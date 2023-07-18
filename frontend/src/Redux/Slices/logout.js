import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Actions/axios";

// export const logout = createAsyncThunk("Slices/logout")
// const logoutSlice = createSlice({
//   name: "logout",
//   initialState: {},
//   reducers: {},
//   extraReducers : (builder)=> {
//     builder.addCase()
//   }
// });
const logoutSlice = createSlice({
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
  logoutRequest,
  logoutSuccess,
  logoutFail,
  clearErrors,
  clearMessage,
} = logoutSlice.actions;

export default logoutSlice.reducer;
