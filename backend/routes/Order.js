import express from "express";
import {
  allOrdersAdmin,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/Order.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

// USER ROLE 
router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/my_orders").get(isAuthenticated, myOrders);

// ADMIN ROLE
router
  .route("/admin/orders")
  .get(isAuthenticated, authorizedRoles("admin"), allOrdersAdmin);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder);
export default router;
