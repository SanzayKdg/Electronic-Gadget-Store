import { createSlice } from "@reduxjs/toolkit";
const allUsersSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
    },
    allUsersFail: (state, action) => {
      state.loadig = false;
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
  allUsersRequest,
  allUsersSuccess,
  allUsersFail,
  clearErrors,
  clearMessage,
} = allUsersSlice.actions;

export default allUsersSlice.reducer;
