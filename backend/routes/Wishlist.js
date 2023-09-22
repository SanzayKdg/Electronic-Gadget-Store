import express from "express";
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../controllers/Wishlist.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/wishlist/add").post(isAuthenticated, addToWishlist);
router.route("/wishlists/:id").get(isAuthenticated, getMyWishlist);
router.route("/wishlist/:id").delete(isAuthenticated, removeFromWishlist);

export default router;
