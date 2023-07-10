import React, { Fragment, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import "./Orders.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { allOrder } from "../../../Redux/Actions/order";
import { clearErrors } from "../../../Redux/Slices/allOrderSlice";
import Loader from "../../Layout/Loader/Loader";
import { Link } from "react-router-dom";

const Orders = () => {
  const { loading, orders, error } = useSelector((state) => state.allOrder);
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(allOrder());
  }, [alert, error, dispatch]);

  return (
    <div className="orderListContainer">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />
          <div className="orderListTable">
            <h1 className="orderListHeader">All Orders</h1>
            <div className="orderTable">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th className="orderAction">Order Id</Th>
                      <Th className="orderAction">Status</Th>
                      <Th className="orderAction">Quantity</Th>
                      <Th className="orderAction">Payment Method</Th>
                      <Th className="orderAction">Amount</Th>
                      <Th className="orderAction">Actions</Th>
                    </Tr>
                  </Thead>
                  {orders &&
                    orders.map((item, index) => (
                      <Fragment key={index}>
                        <Tbody>
                          <Tr>
                            <Td className="tableAction">{item._id}</Td>
                            <Td
                              className={
                                item.orderStatus === "Delivered"
                                  ? "tableAction reviewGreen"
                                  : "tableAction reviewRed" &&
                                    item.orderStatus === "Processing"
                                  ? "tableAction reviewYellow"
                                  : "tableAction reviewRed" &&
                                    item.orderStatus === "Shipped"
                                  ? "tableAction reviewBlue"
                                  : "tableAction reviewRed"
                              }
                            >
                              {item.orderStatus}
                            </Td>
                            {item.orderItems.map((quantity, index) => (
                              <Td key={index} className="tableAction">
                                {quantity.quantity}
                              </Td>
                            ))}
                            <Td className="tableAction">
                              {item.paymentInfo.method}
                            </Td>
                            <Td className="tableAction">{item.totalPrice}</Td>
                            <Td className="tableAction tableActionBtn">
                              <Link
                                to={`/admin/order/${item._id}`}
                                className={
                                  item.orderStatus === "Delivered" ||
                                  item.orderStatus === "Rejected"
                                    ? "orderHide"
                                    : "orderBtn linkIcon"
                                }
                              >
                                <EditIcon className="orderIcon" />
                              </Link>
                              <Button className="orderBtn">
                                <DeleteIcon className="orderIcon" />
                              </Button>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Fragment>
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
