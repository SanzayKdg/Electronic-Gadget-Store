import express from "express";
import {
  addToCart,
  getCartItems,
  removeAllCartItem,
  removeCartItem,
  updateCartQuantity,
} from "../controllers/Cart.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/cart/new").post(isAuthenticated, addToCart);
router
  .route("/carts/:id")
  .get(isAuthenticated, getCartItems)
  .delete(isAuthenticated, removeAllCartItem);
router
  .route("/cart/:id")
  .put(isAuthenticated, updateCartQuantity)
  .delete(isAuthenticated, removeCartItem);

export default router;
