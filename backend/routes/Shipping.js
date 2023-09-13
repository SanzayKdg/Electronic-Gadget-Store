import express from "express";
import {
  createShippingInfo,
  getShippingDetail,
} from "../controllers/Shipping.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/shipping/new").post(isAuthenticated, createShippingInfo);
router.route("/shipping-detail/:id").get(isAuthenticated, getShippingDetail);

export default router;
