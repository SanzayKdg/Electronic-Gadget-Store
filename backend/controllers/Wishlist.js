import { Wishlist } from "../models/Wishlist.js";
import { User } from "../models/User.js";
// add to wish list
export const addToWishlist = async (req, res, next) => {
  try {
    const { product, user } = req.body;
    const wishlist = await Wishlist.create({
      product,
      user,
    });

    await User.findByIdAndUpdate(
      user,
      {
        // $addToSet doesnot let duplicate entries to occur
        $addToSet: { my_preference: product },
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    ).exec();

    res.status(200).json({
      wishlist,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all wishlist
export const getMyWishlist = async (req, res, next) => {
  try {
    const user = req.params.id;
    const wishlistItem = await Wishlist.find({ user })
      .populate("product", "id name images price stock")
      .exec();

    const wishlists = wishlistItem.map((wishlist) => ({
      wishlist_id: wishlist._id,
      product: {
        product_id: wishlist.product._id,
        name: wishlist.product.name,
        price: wishlist.product.price,
        stock: wishlist.product.stock,
        image: wishlist.product.images[0].url || null,
      },
      user: wishlist.user,
    }));
    res.status(200).json({ wishlists, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// remove from wish list
export const removeFromWishlist = async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const wishlist = await Wishlist.findOneAndDelete({
      product: product_id,
    });

    if (!wishlist) {
      return next(
        res.status(404).json({ success: false, message: "Item not found" })
      );
    }

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
