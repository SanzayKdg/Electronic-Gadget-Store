import express from "express";
import { authorizedRoles, isAuthenticated } from "../middlewares/Auth.js";
import {
  createProduct,
  deleteProducts,
  getAllProducts,
  getAllreviews,
  getProductDetails,
  getProductsAdmin,
  newReview,
  updateProducts,
} from "../controllers/Product.js";

const router = express.Router();
router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizedRoles("admin"), createProduct);

router
  .route("/admin/products")
  .get(isAuthenticated, authorizedRoles("admin"), getProductsAdmin);

router.route("/products/:id").get(getProductDetails);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateProducts)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteProducts);

router.route("/product/review/new").put(isAuthenticated, newReview);
router.route("/product/reviews").get(getAllreviews);

export default router;