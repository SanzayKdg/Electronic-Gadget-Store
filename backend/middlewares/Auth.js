import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Authorization
export const authorizedRoles = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          res.status(403).json({
            success: false,
            message: `Role ${req.user.role} is not allowed to access this resource`,
          })
        );
      }
      next();
    };
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
