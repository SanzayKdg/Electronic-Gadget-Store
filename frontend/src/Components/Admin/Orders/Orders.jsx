import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Select,
} from "@chakra-ui/react";
import "./Orders.css";
import AdminSidebar from "../../Layout/AdminSidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import { getAllOrdersAsync } from "../../../features/Order/order";
import Pagination from "react-js-pagination";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const [method, setMethod] = useState("");
  const [price, setPrice] = useState([0, 300000]);

  const setPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (e) => {
    setPrice(e);
  };
  const { orders, error, orderCount, resultPerPage } = useSelector(
    (state) => state.order
  );
  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getAllOrdersAsync({ currentPage, price, orderStatus, method }));
  }, [alert, error, currentPage, price, orderStatus, method]);

  return (
    <div className="orderListContainer">
      <AdminSidebar />
      <div className="orderListTable">
        <h1 className="orderListHeader">All Orders</h1>

        <div className="search__filterContainer">
          <div className="orderFilter filter_container">
            <fieldset className="filterByPrice">
              <legend>Filter By Amount</legend>
              <RangeSlider
                min={0}
                max={300000}
                step={1000}
                defaultValue={price}
                onChange={priceHandler}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <p className="slider__value">
                {price[0]} - {price[1]}
              </p>
            </fieldset>

            <fieldset className="filterByCategory">
              <legend className="filter_legend">Filter By Order Status</legend>
              <Select
                className="selectCats"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value={""}>Select Order Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </fieldset>
            <fieldset className="filterByCategory">
              <legend className="filter_legend">
                Filter By Payment Method
              </legend>
              <Select
                className="selectCats"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value={""}>Select Payment Method</option>
                <option value="card">Card</option>
                <option value="cash_on_delivery">Cash On Delivery</option>
              </Select>
            </fieldset>
          </div>
        </div>

        <div className="orderTable">
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th className="orderAction">S.NO.</Th>
                  <Th className="orderAction">Order Id</Th>
                  <Th className="orderAction">Order Detail</Th>
                  <Th className="orderAction">Status</Th>
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
                        <Td className="tableAction">{index + 1}</Td>
                        <Td className="tableAction">{item._id}</Td>
                        <Td className="tableAction">
                          <Link
                            className="viewOrderDetail"
                            to={`/order/detail/${item._id}`}
                          >
                            View Detail
                          </Link>
                        </Td>

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
                        {/* {item.orderItems.map((quantity, index) => (
                              <Td key={index} className="tableAction">
                                {quantity.quantity}
                              </Td>
                            ))} */}
                        <Td className="tableAction">
                          {item.paymentInfo?.method}
                        </Td>
                        <Td className="tableAction">
                          {item?.totalPrice?.toFixed(2)}
                        </Td>
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
            {resultPerPage && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={orderCount}
                  onChange={setPageNo}
                  nextPageText="Next >"
                  prevPageText="< Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Orders;
