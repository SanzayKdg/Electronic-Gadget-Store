import {
  allOrdersRequest,
  allOrdersSuccess,
  allOrdersFail,
} from "../Slices/allOrderSlice";
import {
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
} from "../Slices/updateOrder";
import { api } from "./axios";

// get all orders -- admin
export const allOrder = () => async (dispatch) => {
  try {
    dispatch(allOrdersRequest());
    const { data } = await api.get("/admin/orders");
    dispatch(allOrdersSuccess(data));
  } catch (error) {
    dispatch(allOrdersFail(error.message));
  }
};

// update order -- admin
export const updateOrder = (orderId, orderStatus) => async (dispatch) => {
  try {
    dispatch(updateOrderRequest());
    const { data } = await api.put(`/admin/order/${orderId}`, orderStatus);
    dispatch(updateOrderSuccess(data));
  } catch (error) {
    dispatch(updateOrderFail());
  }
};
