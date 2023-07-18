// import { loginRequest, loginSuccess, loginFail } from "../Slices/admin";
import {
  allUsersFail,
  allUsersRequest,
  allUsersSuccess,
} from "../Slices/getAllUsers";
import { logoutFail, logoutRequest, logoutSuccess } from "../Slices/logout";
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
} from "../Slices/updateUser";
import { api } from "./axios";

// login -- admin
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await api.post("/login", { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.message));
  }
};

// get All Users -- admin
export const loadAllUser = () => async (dispatch) => {
  try {
    dispatch(allUsersRequest());
    const { data } = await api.get("/admin/users");
    dispatch(allUsersSuccess(data));
  } catch (error) {
    dispatch(allUsersFail(error.message));
  }
};

// logout
export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { data } = await api.get("/logout");
    dispatch(logoutSuccess(data));
    localStorage.removeItem("persist:root");
  } catch (error) {
    dispatch(logoutFail(error.message));
  }
};

// update user role
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const { data } = await api.put(`/admin/user/${userId}`, userData);
    dispatch(updateUserSuccess(data));
  } catch (error) {
    dispatch(updateUserFail(error.message));
  }
};
