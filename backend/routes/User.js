import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  loginUser,
  logout,
  myProfile,
  passwordRecovery,
  registerUser,
  updatePassword,
  updateProfile,
  updateUser,
  verfiyAccount,
} from "../controllers/User.js";
import { authorizedRoles, isAuthenticated } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verify").post(isAuthenticated, verfiyAccount);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, myProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(passwordRecovery);

router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/profile/update").put(isAuthenticated, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizedRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateUser)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);

export default router;
