import express from "express";
import { processPayment, sendStripeApiKey } from "../controllers/Payment.js";
import { isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapikey").get(isAuthenticated, sendStripeApiKey);

export default router;
