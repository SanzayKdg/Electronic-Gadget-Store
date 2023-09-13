import { Shipping } from "../models/Shipping.js";

// create shipping info
export const createShippingInfo = async (req, res, next) => {
  try {
    const { email, contact, address, province, city, zipcode, cart, user } =
      req.body;

    const shipping = await Shipping.create({
      email,
      contact,
      address,
      province,
      city,
      zipcode,
      cart,
      user,
    });

    res.status(200).json({
      shipping,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getShippingDetail = async (req, res, next) => {
  try {
    const shipppingDetail = await Shipping.findById(req.params.id);

    if (!shipppingDetail) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Shipping Detail Not Found" })
      );
    }

    res.status(200).json({
      shipppingDetail,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
