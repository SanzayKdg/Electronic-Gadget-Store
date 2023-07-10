import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Carousel from "./Carousel";
import { images } from "./imagesLink";
import { Rating } from "react-native-elements";
import { Button } from "react-native-paper";
import Loader from "../Components/Loader";
import axios from "axios";
import { baseURL } from "../url";

const ProductDetail = ({ route }) => {
  const { id } = route.params;
  let loading = true;
  console.log("My product details", product);
  console.log("My product Id :", id);

  const [product, setProduct] = useState({});
  useEffect(() => {
    async function getData(pid) {
      const { data } = await axios.get(`${baseURL}/products/${pid}`);
      setProduct(data.product);
      console.log(data, "Dat ais ");
    }

    getData(id);
    loading = false;
  }, [id, loading]);

  return (
    <View style={productStyle.productContainer}>
      {loading && product == undefined ? (
        <Loader />
      ) : (
        <View>
          <Header />
          <ScrollView style={productStyle.productDetailContainer}>
            <View style={productStyle.carouselView}>
              <Carousel images={images} />
            </View>

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
              </View>
            </View>

            <Button style={productStyle.addToCartBtn}>
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
    paddingBottom: 100,
  },

  productDetailContainer: {
    marginTop: 10,
    // borderWidth: 2,
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
    flexDirection: "row",
    marginBottom: 15,
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
});
// info.gasgroup@gmail.com
