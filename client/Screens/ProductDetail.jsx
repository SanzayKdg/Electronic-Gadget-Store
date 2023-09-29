import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Wishlist from "react-native-vector-icons/AntDesign";
import { Rating } from "react-native-elements";
import { Button, Dialog } from "react-native-paper";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import {
  addToWishlist,
  getMyWishlist,
  removeFromWishlist,
} from "../features/wishlistSlice";
import { getReviewsAsync, newReviewAsync } from "../features/reviewSlice";
import Carousel from "../Components/Carousel";
import CardCarousel from "../Components/CardCarousel";
const ProductDetail = ({ navigation, route }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [itemSent, setItemSent] = useState(false);
  const [cartSent, setCartSent] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { id } = route.params;

  const { loading, product, error } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.cart);
  const { reviews, success: reviewSuccess } = useSelector(
    (state) => state.review
  );
  const {
    error: wishlist_error,
    wishlists,
    success: wishlist_success,
  } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const openDialogHandler = () => {
    setOpenDialog(!openDialog);
  };
  const submitReviewHandler = () => {
    if (!isAuthenticated) {
      alert("Please login first");
      navigation.navigate("Login");
    }
    if (rating === 0 || comment === "") {
      ToastAndroid.show(
        "Please fill all the fields",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    const reviewData = {
      comment,
      rating,
      productId: id,
    };
    dispatch(newReviewAsync(reviewData));
    setReviewAdded(true);
    setOpenDialog(false);
    setTimeout(() => {
      dispatch(getSingleProduct(id));
      dispatch(getReviewsAsync(id));
    }, 500);
  };

  const addToCartHandler = () => {
    const cartItem = {
      quantity: 1,
      product: id,
      user: user._id,
    };

    if (!isAuthenticated) {
      alert("Please login first");
      navigation.navigate("Login");
    }
    if (product.stock <= 0) {
      ToastAndroid.show(
        "Out of Stock. Please Try Again Later",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else {
      dispatch(addToCart(cartItem));
      setCartSent(true);
    }
  };

  const addWishList = async () => {
    const wishlist_item = {
      product: id,
      user: user._id,
    };
    if (!isAuthenticated) {
      ToastAndroid.show(
        "Please login first",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      navigation.navigate("Login");
    }

    dispatch(addToWishlist(wishlist_item));
    dispatch(getMyWishlist(user._id));
    setItemSent(true);
  };

  const removeWishlist = async () => {
    dispatch(removeFromWishlist(id));
    ToastAndroid.show(
      "Item Removed from wishlist",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    dispatch(getMyWishlist(user._id));
  };

  useEffect(() => {
    if (error) {
      alert("Some error occured. Please try again.");
    }
    if (success && cartSent === true) {
      ToastAndroid.show(
        "Successfully added to cart",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      setCartSent(false);
    }
    dispatch(getSingleProduct(id));
    dispatch(getReviewsAsync(id));
  }, [dispatch, id, error, success, cartSent]);

  useEffect(() => {
    if (wishlist_error) {
      alert(wishlist_error);
    }
    if (wishlist_success && itemSent === true) {
      ToastAndroid.show(
        "Added to Wishlist",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      setItemSent(false);
    }

    if (reviewAdded === true && reviewSuccess) {
      ToastAndroid.show(
        "Submitted Review",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      setReviewAdded(false);
    }
  }, [wishlist_error, wishlist_success, itemSent, ToastAndroid]);

  const isProductInWishlist = wishlists?.some((wishlistItem) => {
    return wishlistItem.product.product_id === id;
  });

  return (
    <ScrollView style={productStyle.productContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <View style={productStyle.productDetailContainer}>
            <View style={productStyle.carouselView}>
              <Carousel
                images={product.images?.map((image) => {
                  return { source: { uri: image.url } };
                })}
              />
            </View>
            <View style={productStyle.productDescContainer}>
              <View style={productStyle.productDescSection1}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={productStyle.productName}>{product.name}</Text>
                  <TouchableOpacity style={productStyle.wishlistContainer}>
                    {isProductInWishlist === false ? (
                      <>
                        <Wishlist
                          name="heart"
                          size={25}
                          color={"#AAA8"}
                          onPress={addWishList}
                        />
                      </>
                    ) : (
                      <>
                        <Wishlist
                          name="heart"
                          size={25}
                          color={"#e53935"}
                          onPress={removeWishlist}
                        />
                      </>
                    )}
                  </TouchableOpacity>
                </View>

                <Text style={productStyle.productId}>
                  Product # {product._id}
                </Text>
              </View>
              <View style={productStyle.productDescSection2}>
                <Rating
                  startingValue={product.ratings}
                  ratingCount={5}
                  imageSize={25}
                  style={productStyle.productRating}
                  readonly
                />
                <Text style={productStyle.productId}>
                  (
                  {product.reviews?.length < 0 ? (
                    <>0</>
                  ) : (
                    <>{product.reviews?.length}</>
                  )}{" "}
                  reviews)
                </Text>
              </View>
              <View style={productStyle.productDescSection3}>
                <Text style={productStyle.productPrice}>
                  Nrs. {product.price}
                </Text>
                {product.stock > 0 ? (
                  <Text style={productStyle.inStock}>In stock</Text>
                ) : (
                  <Text style={productStyle.outOfStock}>Out of Stock</Text>
                )}
              </View>
              <View style={productStyle.productDescSection4}>
                <Text style={productStyle.productDescription}>
                  {product.description}
                </Text>

                <Button
                  onPress={openDialogHandler}
                  style={productStyle.reviewBtn}
                >
                  <Text style={productStyle.reviewBtnTxt}>Submit Review</Text>
                </Button>
              </View>
            </View>

            <CardCarousel reviews={reviews} />
            <Button
              onPress={addToCartHandler}
              style={productStyle.addToCartBtn}
            >
              <Text style={productStyle.addToCartBtnTxt}>Add to Cart</Text>
            </Button>

            <Dialog
              style={productStyle.reviewDialog}
              visible={openDialog}
              onDismiss={openDialogHandler}
            >
              <Dialog.Title>Submit Review</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={productStyle.input}
                  placeholder="Write a Review"
                  multiline={true}
                  numberOfLines={5}
                  value={comment}
                  onChangeText={setComment}
                />
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text>Rate this product: </Text>
                  <Rating
                    startingValue={rating}
                    ratingCount={5}
                    imageSize={25}
                    fractions={2}
                    style={productStyle.productRating}
                    onFinishRating={(value) => {
                      const roundedRating = Math.round(value * 2) / 2;
                      setRating(roundedRating);
                    }}
                  />
                  <Text>{rating} / 5</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <TouchableOpacity
                    style={productStyle.cancelBtn}
                    onPress={openDialogHandler}
                  >
                    <Text style={productStyle.reviewBtnTxt}>Cancel</Text>
                  </TouchableOpacity>

                  <Button
                    style={productStyle.submitBtn}
                    onPress={submitReviewHandler}
                  >
                    <Text style={productStyle.reviewBtnTxt}>Add</Text>
                  </Button>
                </View>
              </Dialog.Content>
            </Dialog>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProductDetail;

const productStyle = StyleSheet.create({
  productContainer: {
    backgroundColor: "#AAA1",
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  productDetailContainer: {
    flex: 1,
    marginTop: 10,
    padding: 5,
  },
  carouselView: {
    backgroundColor: "#FFF",
  },
  productImage: { width: "15%", height: "50%" },
  productDescContainer: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#FFF",
  },
  productDescSection1: {
    marginBottom: 15,
  },
  productDescSection2: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  productDescSection3: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  productDescSection4: {
    marginBottom: 15,
  },
  reviewDialog: {
    backgroundColor: "#fff",
    height: 400,
  },
  reviewBtn: {
    marginTop: 15,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    width: "100%",
  },
  reviewBtnTxt: {
    fontSize: 10,
    color: "#FFF",
  },

  productName: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 700,
  },

  productId: {
    fontStyle: "italic",
    fontSize: 10,
    color: "#808080",
  },
  productRating: {
    marginRight: 10,
  },
  productPrice: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 700,
  },
  inStock: {
    color: "#14A44D",
  },
  outOfStock: {
    color: "#DC4C64",
  },

  productDescription: {
    color: "#808080",
  },
  addToCartBtn: {
    justifyContent: "center",
    backgroundColor: "#FF6347",
    height: "7%",
    borderRadius: 8,
    marginBottom: 70,
  },
  addToCartBtnTxt: {
    color: "#fff",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
    justifyContent: "flex-start",
    borderWidth: 0.5,
    borderColor: "#a8a8a8",
  },
  wishlistContainer: {
    marginVertical: 15,
    flexDirection: "row",
  },
  cancelBtn: {
    justifyContent: "center",
    backgroundColor: "#900",
    borderRadius: 8,
    width: 100,
    height: 50,
    alignItems: "center",
  },
  submitBtn: {
    justifyContent: "center",
    backgroundColor: "#FF6347",
    borderRadius: 8,
    width: 100,
    height: 50,
    marginLeft: 20,
    alignItems: "center",
  },
  reviewBtnTxt: {
    color: "#fff",
    fontSize: 14,
  },
});
// info.gasgroup@gmail.com
