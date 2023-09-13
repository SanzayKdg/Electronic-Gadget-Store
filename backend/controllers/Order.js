import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";
import { sendMail } from "../utils/SendMail.js";

// create a new order -- User
export const newOrder = async (req, res, next) => {
  try {
    function generateRandomId(length) {
      const characters =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      shippingPrice,
      totalPrice,
      contact,
      user,
    } = req.body;
    let order = {};
    if (paymentInfo.method === "cash_on_delivery") {
      paymentInfo.id = generateRandomId(8);
      paymentInfo.method = "cash_on_delivery";
      order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        contact,
        user,
        paidAt: null,
      });
    }
    if (paymentInfo.method === "card") {
      paymentInfo.id = generateRandomId(8);
      paymentInfo.method = "card";
      paymentInfo.status = "completed";
      order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        contact,
        user,
        paidAt: Date.now(),
      });
    }
    console.log(shippingInfo.email);
    await sendMail(
      shippingInfo.email,
      `Your order was placed successfully. Your order id is ${order.id}. Do not share this id or lost it`
    );
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

// get single order or order details
export const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      res.status(404).json({
        message: "Order not found with this id",
      })
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
};

// get logged in user order details
export const myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
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

// delete order --admin routes
export const deleteOrder = async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(
      res
        .status(404)
        .json({ success: false, message: "Order not found with this id" })
    );
  }
  res.status(200).json({
    success: true,
  });
};
