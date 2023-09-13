import mongoose from "mongoose";
import validator from "validator";

const shippingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  contact: {
    type: Number,
    required: [true, "Please enter contact number"],
    minlength: [10, "Contact must have 10 numbers"],
  },
  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  province: {
    type: String,
    required: [true, "Please enter province"],
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
  },
  zipcode: {
    type: String,
    required: [true, "Please enter product name"],
  },
});

export const Shipping = mongoose.model("Shipping", shippingSchema);
