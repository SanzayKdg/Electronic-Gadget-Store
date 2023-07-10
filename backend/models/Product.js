import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, "Product Stock cannot exceed more than  4 characters"],
  },
  noOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Product", productSchema);
