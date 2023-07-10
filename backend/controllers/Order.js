import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

// create a new order -- User
export const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      contact,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      contact,
      paidAt: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all orders -- admin
export const allOrdersAdmin = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let totalAmount = 0;

    //   calculating all the ordered products price of the user
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      orders,
      totalAmount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update order status -- admin
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Order not found with this id" })
      );
    }
    if (order.orderStatus === "Delivered") {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Order not found with this id" })
      );
    }
    if (order.orderStatus === "Rejected") {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Order not found with this id" })
      );
    }
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// function to update stock after order has been shipped
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;
  if (quantity > 1) {
    await product.save({
      validateBeforeSave: false,
    });
  }
}
