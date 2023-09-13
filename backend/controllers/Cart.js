import { Cart } from "../models/Cart.js";

// create cart
export const addToCart = async (req, res, next) => {
  try {
    const { quantity, product, user } = req.body;
    const cart = await Cart.create({
      product,
      user,
      quantity,
    });

    res.status(200).json({
      cart,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const cartItems = await Cart.find({ user: userId })
      .populate("product", "id name images price") // Populate the product details
      .exec();

    const carts = cartItems.map((cart) => ({
      cart_id: cart._id,
      product: {
        id: cart.product._id,
        name: cart.product.name,
        price: cart.product.price,
        image: cart.product.images[0].url || null,
      },

      quantity: cart.quantity,
      user: cart.user,
    }));

    res.status(200).json({ success: true, carts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartQuantity = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id);

    if (!cart) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Cart not found with this id" })
      );
    }

    cart.quantity = req.body.quantity;
    await cart.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return next(
        res
          .status(404)
          .json({ success: false, message: "Cart not found with this id" })
      );
    }

    res.status(200).json({
      success: true,
      message: "Cart Item Removed.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeAllCartItem = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await Cart.deleteMany({ user: userId });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
