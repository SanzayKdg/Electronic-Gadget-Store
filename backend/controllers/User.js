import { User } from "../models/User.js";
import { sendMail } from "../utils/SendMail.js";
import sendToken from "../utils/SendToken.js";
import cloudinary from "cloudinary";
import crypto from "crypto";
import fs from "fs";
// Create a new user
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, contact } = req.body;
    const avatar = req.files.avatar.tempFilePath;
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // cloudinary file upload
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale",
    });

    // delete tmp folder and files
    fs.rmSync("./tmp", { recursive: true });

    // create a otp
    const otp = Math.floor(Math.random() * 1000000).toString();
    user = await User.create({
      name,
      email,
      password,
      contact,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });

    // sending otp to verify mail
    await sendMail(email, "Please verify your account", `Your OTP is ${otp}`);

    // sending token as response
    sendToken(
      user,
      201,
      res,
      "Account Created Successfully. Please verify your account."
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verfiy account
export const verfiyAccount = async (req, res, next) => {
  try {
    const otp = Number(req.body.otp);
    const user = await User.findById(req.user._id);
    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid or has been expired",
      });
    }
    // else
    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendToken(user, 200, res, "Account Verified");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        res.status(401).json({ success: false, message: "Invalid credentials" })
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(
        res.status(401).json({ success: false, message: "Invalid credentials" })
      );
    }

    const passwordMatched = await user.comparePassword(password);

    if (!passwordMatched) {
      return next(
        res.status(401).json({ success: false, message: "Invalid credentials" })
      );
    }

    sendToken(user, 200, res, "Login Success");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout user
export const logout = async (req, res, next) => {
  try {
    console.log("is being Hit here");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get user profile
export const myProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    // sending token as response
    sendToken(user, 200, res, `Welcome ${user.name}`);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all users -- admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all users -- admin
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update user role -- admin
export const updateUser = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// forgot password
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      res.status(404).json({ success: false, message: "User does not exists." })
    );
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

  const message = `Please click the below link to reset your password ttemp \n\n ${resetPasswordUrl} \n\n Ignore this message if you did not requested password change.`;

  try {
    await sendMail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
};

// Password Recovery
export const passwordRecovery = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return next(
        res.status(404).json({
          message: "OTP code is invalid or has been expired",
        })
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(
        res.status(404).json({
          message: "Password did not matched",
        })
      );
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res, "Password Changed Successfulle");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(res.status(400).json({ message: "Incorrect Password" }));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(res.status(400).json({ message: "Password didn't matched" }));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res, "Password changed successfully");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const avatar = req.files.avatar.tempFilePath;
    const { name, email, contact } = req.body;

    console.log(
      "name",
      name,
      "email",
      email,
      "contact",
      contact,
      "from frontend"
    );
    console.log("avatar", avatar, "from frontend");

    if (name && email && contact) {
      user.name = name;
      user.email = email;
      user.contact = contact;
    }

    if (avatar) {
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale",
      });
      // delete tmp folder and files
      fs.rmSync("./tmp", { recursive: true });
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();

    if (!user) {
      return next(
        res
          .status(404)
          .json({ message: "User does not exists or is not logged in" })
      );
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete user -- admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return next(
        res.status(404).json({
          message: "User does not exists or has already been deleted",
        })
      );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
