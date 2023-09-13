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
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Carousel from "./Carousel";

import { Rating } from "react-native-elements";
import { Button, Dialog } from "react-native-paper";
import Loader from "../Components/Loader";
import axios from "axios";
import { baseURL } from "../url";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";

const ProductDetail = ({ navigation, route }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const openDialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const { id } = route.params;

  const { loading, product, error } = useSelector((state) => state.product);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert("Some error occured. Please try again.");
    }

    dispatch(getSingleProduct(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    const cartItem = {
      name: product.name,
      image: product.images[0].url,
      quantity: 1,
      product: id,
      price: product.price,
      user: user._id,
    };

    if (!isAuthenticated) {
      alert("Please login first");
      navigation.navigate("Login");
    }
    dispatch(addToCart(cartItem));

    if (success) {
      alert("Successfully added to cart");
    }
  };

  return (
    <View style={productStyle.productContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Header />
          <ScrollView style={productStyle.productDetailContainer}>
            {/* <View style={productStyle.carouselView}><Carousel /></View> */}

            <View style={productStyle.productDescContainer}>
              <View style={productStyle.productDescSection1}>
                <Text style={productStyle.productName}>{product.name}</Text>
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
                <Text style={productStyle.productId}>({} reviews)</Text>
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

            <Dialog visible={openDialog} onDismiss={openDialogHandler}>
              <Dialog.Title>Submit Review</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  style={productStyle.input}
                  placeholder="Comment"
                  // value={description}
                  // onChangeText={setDescription}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={openDialogHandler}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                  <Button
                    // disabled={!title || !description}
                    // onPress={submitReviewHandler}
                    textColor="#900"
                  >
                    Add
                  </Button>
                </View>
              </Dialog.Content>
            </Dialog>

            <Button
              onPress={addToCartHandler}
              style={productStyle.addToCartBtn}
            >
              <Text style={productStyle.addToCartBtnTxt}>Add to Cart</Text>
            </Button>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetail;

const productStyle = StyleSheet.create({
  productContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  productDetailContainer: {
    marginTop: 10,
    padding: 5,
  },
  carouselView: {
    backgroundColor: "#FFF",
  },
  productDescContainer: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#FFF",
  },
  productDescSection1: {
    flexDirection: "row",
    alignItems: "center",
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

  reviewBtn: {
    marginTop: 15,
    backgroundColor: "#FF6347",
    width: "30%",
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
    backgroundColor: "#FF6347",
    height: "30%",
    borderRadius: 8,
  },
  addToCartBtnTxt: {
    color: "#fff",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 15,
  },
  productImage: {},
});
// info.gasgroup@gmail.com
