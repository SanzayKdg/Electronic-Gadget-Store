import express from "express";
import { allOrdersAdmin, newOrder, updateOrder } from "../controllers/Order.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, newOrder);

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizedRoles("admin"), allOrdersAdmin);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateOrder);

export default router;
