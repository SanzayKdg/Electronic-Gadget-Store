import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {},
  reducers: {
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    updateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.success = null;
    },
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  clearErrors,
  clearMessage,
} = updateUserSlice.actions;

export default updateUserSlice.reducer;
