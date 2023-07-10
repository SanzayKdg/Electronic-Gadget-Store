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
import { updateOrder } from "../../../Redux/Actions/order";
import { clearErrors, clearMessage } from "../../../Redux/Slices/updateOrder";

const UpdateOrder = () => {
  const [status, setStatus] = useState("");
  const { loading, error, success } = useSelector((state) => state.updateOrder);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const updateOrderHandler = (e) => {
    e.preventDefault();
    const statusData = new FormData();
    statusData.set("status", status);
    dispatch(updateOrder(id, statusData));
    navigate("/admin/orders");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Order Status Updated Successfully");
      dispatch(clearMessage());
    }
  }, [error, alert, dispatch, success]);

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
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Rejected">Rejected</option>
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
