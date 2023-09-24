import React, { Fragment, useEffect, useState } from "react";
import "./UpdateOrder.css";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../Layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetailAsync,
  updateOrderAsync,
} from "../../../features/Order/order";

const UpdateOrder = () => {
  const [status, setStatus] = useState("");
  const { loading, error, success, order } = useSelector(
    (state) => state.order
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedOrder, setUpdatedOrder] = useState(false);

  useEffect(() => {
    dispatch(getOrderDetailAsync(id));
  }, [dispatch]);
  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus !== undefined ? order.orderStatus : "");
    }
  }, [order]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success && updatedOrder === true) {
      alert.success("Order Status Updated Successfully");
      setUpdatedOrder(false);
      navigate("/admin/orders");
    }
  }, [error, alert, success, updatedOrder, navigate]);

  const updateOrderHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderAsync({ orderId: id, status }));
    setUpdatedOrder(true);
  };
  return (
    <div className="addProductsContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productForm">
            <form className="updateOrderForm" onSubmit={updateOrderHandler}>
              <h1 className="addProductHeader">Update Order Status</h1>
              <FormControl>
                <InputGroup className="form__item" size="md">
                  <FormLabel htmlFor="productCategory">
                    Select Status:
                  </FormLabel>
                  <Select
                    placeholder="Select option"
                    id="productCategory"
                    name="productCategory"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {order?.orderStatus === "Shipped" ? (
                      <></>
                    ) : (
                      <option value="Processing">Processing</option>
                    )}
                    <option value="Shipped">Shipped</option>

                    {order?.orderStatus === "Processing" ? (
                      <></>
                    ) : (
                      <option value="Delivered">Delivered</option>
                    )}
                    {order?.orderStatus === "Shipped" ? (
                      <></>
                    ) : (
                      <option value="Rejected">Rejected</option>
                    )}
                  </Select>
                </InputGroup>

                <InputGroup className="form__item">
                  <Button type="submit" className="addProduct__btn">
                    Update Status
                  </Button>
                </InputGroup>
              </FormControl>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UpdateOrder;
