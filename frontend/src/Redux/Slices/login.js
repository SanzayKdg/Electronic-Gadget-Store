import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../Actions/axios";

// export const login = createAsyncThunk(
//   "admin/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("login", { email, password });
//       console.log(response.data, "from admin.js slices");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {},
//   reducers: {
//     clearErrors: (state) => {
//       state.error = null;
//     },
//     clearMessage: (state) => {
//       state.message = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(login.pending, (state) => {
//       state.loading = true;
//     });

//     builder.addCase(login.fulfilled, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//       state.message = action.payload.message;
//     });

//     builder.addCase(login.rejected, (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = false;
//       state.error = "Error occured";
//     });
//   },
// });

const loginSlice = createSlice({
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
      state.isAuthenticated = false;
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
} = loginSlice.actions;
export default loginSlice.reducer;
