import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailAsync } from "../../../features/Order/order";
import "./OrderDetail.css";
import { useParams } from "react-router";
import Loader from "../../Layout/Loader/Loader";
import AdminSidebar from "../../Layout/AdminSidebar";
import { getUserAsync } from "../../../features/User/user";

const OrderDetail = () => {
  const { order, error, loading, image } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getOrderDetailAsync(id));
  }, [alert, error, dispatch]);

  useEffect(() => {
    if (order) {
      dispatch(getUserAsync(order.user));
    }
  }, [dispatch, order]);

  return (
    <div className="orderDetail__container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <AdminSidebar />
          <div className="orderContainer">
            <h1 className="orderDetail__header">Order Details</h1>

            <div className="orderDetail__summary">
              <div className="orderTop__container">
                <div className="orderSummary__shippingInfo">
                  <h1 className="shippinginfo__header">Shipping Details</h1>
                  <div className="shipping__items">
                    <p className="shipping__info order__label">User Name: </p>
                    <p className="shipping__info">{user.name}</p>
                  </div>

                  <div className="shipping__items">
                    <p className="shipping__info order__label">Contact: </p>
                    <p className="shipping__info">
                      +977{order.shippingInfo?.contact}
                    </p>
                  </div>

                  <div className="shipping__items">
                    <p className="shipping__info order__label">Email: </p>
                    <p className="shipping__info">
                      {order.shippingInfo?.email}
                    </p>
                  </div>

                  <div className="shipping__items">
                    <p className="shipping__info order__label">Address: </p>
                    <p className="shipping__info">
                      {order.shippingInfo?.address} |{" "}
                      {order?.shippingInfo?.province} |{" "}
                      {order.shippingInfo?.city} | {order.shippingInfo?.zipCode}
                    </p>
                  </div>
                  <div className="shipping__items">
                    <p className="shipping__info order__label">Invoice no.: </p>
                    <p className="shipping__info">#{order.paymentInfo?.id}</p>
                  </div>
                </div>

                <div className="divider__line"></div>
                <div className="orderSummary__amounts">
                  <h1 className="orderSummary__header">Order Summary</h1>

                  <div className="shipping__items">
                    <p className="order_summary order__label">Order Id: </p>
                    <p className="order_summary">#{order._id}</p>
                  </div>
                  <div className="shipping__items">
                    <p className="order_summary order__label">Order Status: </p>
                    <p
                      className={
                        order.orderStatus === "Delivered"
                          ? "order_summary reviewGreen"
                          : "order_summary reviewRed" &&
                            order.orderStatus === "Processing"
                          ? "order_summary reviewYellow"
                          : "order_summary reviewRed" &&
                            order.orderStatus === "Shipped"
                          ? "order_summary reviewBlue"
                          : "order_summary reviewRed"
                      }
                    >
                      {order.orderStatus}
                    </p>
                  </div>

                  <div className="shipping__items">
                    <p className="order_summary order__label">
                      Payment Method:
                    </p>
                    <p
                      className={
                        order.paymentInfo?.method === "card"
                          ? "order_summary orderGreen"
                          : "order_summary colorRed"
                      }
                    >
                      {order.paymentInfo?.method === "card"
                        ? "Card"
                        : "Cash On Delivery"}
                    </p>
                  </div>

                  <div className="shipping__items">
                    <p className="order_summary order__label">
                      Payment Status:
                    </p>
                    <p
                      className={
                        order.paymentInfo?.status === "completed"
                          ? "order_summary orderGreen"
                          : "order_summary colorBlue"
                      }
                    >
                      {order.paymentInfo?.status === "completed"
                        ? "Completed"
                        : "Processing"}
                    </p>
                  </div>

                  <div className="shipping__items">
                    <p className="order_summary order__label">Item Price: </p>
                    <p className="order_summary">{order.itemsPrice}</p>
                  </div>
                  <div className="shipping__items">
                    <p className="order_summary order__label">
                      Shipping Amount:
                    </p>
                    <p className="order_summary">{order.shippingPrice}</p>
                  </div>

                  <div className="shipping__items">
                    <p className="order_summary order__label">Total Amount:</p>
                    <p className="order_summary">{order.totalPrice}</p>
                  </div>
                </div>
              </div>

              <div className="orderSummary__cartItems">
                <h1 className="cartItem__header">Order Items</h1>
                {order.orderItems &&
                  order.orderItems?.map((item, index) => (
                    <div className="order__items" key={index}>
                      <div className="shipping__items">
                        <p className="order_summary order__label">
                          Product Id:
                        </p>
                        <p className="order_summary">#{item.product}</p>
                      </div>
                      <div className="shipping__items">
                        <p className="order_summary order__label">
                          Product Name
                        </p>
                        <p className="order_summary">{item.name}</p>
                      </div>
                      <div className="shipping__items">
                        <p className="order_summary order__label">
                          Order Quantity:
                        </p>
                        <p className="order_summary">{item.quantity}</p>
                      </div>
                      <div className="shipping__items">
                        <p className="order_summary order__label">Price:</p>
                        <p className="order_summary">Rs. {item.price}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
