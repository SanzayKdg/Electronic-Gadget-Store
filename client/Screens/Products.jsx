import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Slider, Rating } from "react-native-elements";
import { accessories, laptops, smartphones } from "./categories";
import { Button, Card } from "react-native-paper";
import Menu from "react-native-vector-icons/MaterialIcons";
import Close from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getAllProducts } from "../features/productSlice";

const Products = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  const { loading, products, error } = useSelector((state) => state.product);
  // const { loading, products, productsCount, resultPerPage, error } =
  //   useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getAllProducts());
  }, [error, dispatch]);

  return (
    <View style={productsStyle.productContainer}>
      {loading ? (
        <Loader />
      ) : (
        <View>
          <Header />
          <SafeAreaView style={{ flexDirection: "row", paddingVertical: 5 }}>
            <View>
              <Menu
                name="menu"
                onPress={() => handleClose()}
                style={!open ? productsStyle.expandBtn : { display: "none" }}
                size={30}
              />
              <ScrollView
                style={
                  !open
                    ? { display: "none" }
                    : { display: "flex" } && productsStyle.sideBar
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={productsStyle.categoryHeading}>Filters</Text>
                  <Close name="close" size={25} onPress={() => handleClose()} />
                </View>
                <View>
                  {/* <Text style={productsStyle.categoryHeading}>By Price</Text>
            <View style={productsStyle.ratingContainer}>
              <Slider
                value={price}
                maximumValue={10000}
                onValueChange={(e) => setPrice(Math.ceil(e))}
                style={productsStyle.ratingSlider}
                thumbTouchSize={{ width: 150 }}
                thumbTintColor="#FF6347"
              />

              <Text style={{ marginLeft: 10 }}>{price}</Text>
            </View> */}
                  <Text style={productsStyle.categoryHeading}>
                    Ratings Above
                  </Text>
                  <View style={productsStyle.ratingContainer}>
                    <Slider
                      value={rating}
                      maximumValue={5}
                      onValueChange={(e) => setRating(Math.ceil(e))}
                      style={productsStyle.ratingSlider}
                      thumbTouchSize={{ width: 150 }}
                      thumbTintColor="#FF6347"
                    />

                    <Text style={{ marginLeft: 10 }}>{rating}</Text>
                  </View>
                </View>

                <View style={productsStyle.categoryContainer}>
                  <Text style={productsStyle.categoryHeading}>Categories</Text>
                  <Text style={productsStyle.categoryHeading}>SmartPhones</Text>

                  {smartphones &&
                    smartphones.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={productsStyle.categoryLists}
                      >
                        <Text
                          onPress={() => handleClose()}
                          style={{ fontSize: 14 }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}

                  <Text style={productsStyle.categoryHeading}>Laptops</Text>
                  {laptops &&
                    laptops.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={productsStyle.categoryLists}
                      >
                        <Text
                          onPress={() => handleClose()}
                          style={{ fontSize: 14 }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}

                  <Text style={productsStyle.categoryHeading}>Accessories</Text>
                  {accessories &&
                    accessories.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={productsStyle.categoryLists}
                      >
                        <Text
                          onPress={() => handleClose()}
                          style={{ fontSize: 14 }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </ScrollView>
            </View>

            <ScrollView
              style={{
                marginTop: 50,
                position: "relative",
                left: -20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                {products &&
                  products.map((item, index) => (
                    <Card
                      onPress={() =>
                        navigation.navigate("Product", { id: item._id })
                      }
                      key={index}
                      style={productsStyle.cardView}
                    >
                      <Image
                        style={productsStyle.productImage}
                        source={{ uri: item.images[0].url }}
                      />
                      <View style={productsStyle.productDesc}>
                        <Text style={productsStyle.productDescItem}>
                          {item.name}
                        </Text>
                        <Text style={productsStyle.productDescItem}>
                          {item.price}
                        </Text>
                        <Rating
                          startingValue={item.rating}
                          ratingCount={5}
                          imageSize={25}
                          style={productsStyle.productDescItem}
                          readonly
                        />
                      </View>
                    </Card>
                  ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default Products;
const productsStyle = StyleSheet.create({
  productContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  expandBtn: {
    backgroundColor: "#FFF",
    width: 30,
    color: "#FF6347",
    marginLeft: 5,
    borderRadius: 5,
  },
  sideBar: {
    backgroundColor: "#FFF",
    padding: 10,
    height: "100%",
    zIndex: 999,
  },
  ratingContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingSlider: {
    width: 100,
  },
  categoryContainer: {
    marginTop: 10,
  },

  categoryHeading: {
    marginTop: 10,
    fontWeight: 700,
    fontSize: 15,
  },
  categoryLists: {
    marginTop: 5,
  },
  cardView: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  productImage: {
    width: 150,
    height: 150,
  },
  productDesc: {
    marginTop: 10,
    alignItems: "center",
  },
  productDescItem: {
    marginTop: 10,
  },
});
