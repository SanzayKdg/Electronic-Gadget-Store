import express from "express";
import { authorizedRoles, isAuthenticated } from "../middlewares/Auth.js";
import {
  createProduct,
  deleteProductReviews,
  deleteProducts,
  getAllProducts,
  getAllreviews,
  getProductDetails,
  getProductsAdmin,
  newReview,
  updateProducts,
} from "../controllers/Product.js";

const router = express.Router();
// ROLE ALL

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductDetails);

// USER ROLE

router.route("/product/review/new").put(isAuthenticated, newReview);
router
  .route("/product/reviews")
  .get(getAllreviews)
  .delete(isAuthenticated, deleteProductReviews);

// ADMIN ROLE
router
  .route("/product/new")
  .post(isAuthenticated, authorizedRoles("admin"), createProduct);

router
  .route("/admin/products")
  .get(isAuthenticated, authorizedRoles("admin"), getProductsAdmin);

router
  .route("/product/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateProducts)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteProducts);

export default router;
