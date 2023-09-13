import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    province: { type: String, required: true },
    zipCode: { type: Number, required: true },
    contact: { type: String, required: true },
  },

  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  paymentInfo: {
    id: { type: String, required: true },
    method: { type: String, required: true },
    status: { type: String, required: true, default: "processing" },
  },

  paidAt: { type: Date },
  itemsPrice: { type: Number, default: 0, required: true },
  shippingPrice: { type: Number, default: 0, required: true },
  totalPrice: { type: Number, default: 0, required: true },
  orderStatus: { type: String, default: "Processing", required: true },
  deliveredAt: Date,
  createdAt: { type: Date, default: Date.now() },
});

export const Order = mongoose.model("Order", orderSchema);
