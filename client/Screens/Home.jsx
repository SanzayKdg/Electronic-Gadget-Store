import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Rating } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { images } from "../extras/imagesLink";
import Header from "../Components/Header";
import { brandCategory } from "../extras/categories";
import Carousel from "../Components/Carousel";
import { useNavigation } from "@react-navigation/core";
import { Card } from "react-native-paper";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getRecommendedProducts,
} from "../features/productSlice";
import CardCarousel from "../Components/CardCarousel";
const Home = () => {
  const navigation = useNavigation();
  const { products, recommend, loading, error } = useSelector(
    (state) => state.product
  );

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const displayedProducts = products.slice(0, 6);
  const display_recommended_products = recommend?.slice(0, 6);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert(error);
    }

    dispatch(getAllProducts({}));
   if(isAuthenticated){
    dispatch(getRecommendedProducts(user?._id));
   }
  }, [dispatch, error, isAuthenticated]);

  return (
    <View style={homeStyle.homeContainer}>
      <ScrollView>
        <SafeAreaView style={homeStyle.safeView}>
          <Header />

          <View style={homeStyle.carouselcontainer}>
            <Carousel images={images} />
          </View>
        </SafeAreaView>

        <View style={homeStyle.categoriesContainer}>
          <Text style={homeStyle.categoriesHeader}>Popular Brands</Text>
          <View style={homeStyle.categories}>
            {brandCategory.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Products", {
                    category: item.title,
                  });
                }}
              >
                <View style={homeStyle.categoriesCard}>
                  <Image
                    style={homeStyle.categoriesImage}
                    source={{ uri: item.uri }}
                  />
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={homeStyle.categoriesContainer}>
          {/* Featred Products -- Later display by Algorithm */}
          <Text style={homeStyle.categoriesHeader}>Featured Products</Text>

          {loading ? (
            <Loader />
          ) : (
            <View style={homeStyle.products}>
              {isAuthenticated ? (
                <>
                  {display_recommended_products &&
                    display_recommended_products?.map((item, index) => (
                      <Card
                        onPress={() =>
                          navigation.navigate("Product", { id: item._id })
                        }
                        key={index}
                        style={homeStyle.cardView}
                      >
                        <Image
                          style={homeStyle.productImage}
                          source={{ uri: item.images[0].url }}
                        />
                        <View style={homeStyle.productDesc}>
                          <Text style={homeStyle.productDescItem}>
                            {item.name}
                          </Text>
                          <Text style={homeStyle.productDescItem}>
                            {item.price}
                          </Text>
                          <Rating
                            startingValue={item.ratings}
                            ratingCount={5}
                            imageSize={25}
                            style={homeStyle.productDescItem}
                            readonly
                          />
                        </View>
                      </Card>
                    ))}
                </>
              ) : (
                <>
                  {displayedProducts &&
                    displayedProducts?.map((item, index) => (
                      <Card
                        onPress={() =>
                          navigation.navigate("Product", { id: item._id })
                        }
                        key={index}
                        style={homeStyle.cardView}
                      >
                        <Image
                          style={homeStyle.productImage}
                          source={{ uri: item.images[0].url }}
                        />
                        <View style={homeStyle.productDesc}>
                          <Text style={homeStyle.productDescItem}>
                            {item.name}
                          </Text>
                          <Text style={homeStyle.productDescItem}>
                            {item.price}
                          </Text>
                          <Rating
                            startingValue={item.ratings}
                            ratingCount={5}
                            imageSize={25}
                            style={homeStyle.productDescItem}
                            readonly
                          />
                        </View>
                      </Card>
                    ))}
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const homeStyle = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  safeView: {
    backgroundColor: "#fff",
  },
  carouselcontainer: {
    flex: 1,
    marginTop: 20,
  },
  categoriesHeader: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 20,
  },
  categoriesContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  categoriesCard: {
    marginTop: 20,
    marginBottom: 10,
    borderColor: "#a8a8a8",
    borderWidth: 0.5,
    padding: 5,
    alignItems: "center",
  },

  categoriesImage: {
    height: 80,
    width: 110,
  },
  products: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingBottom: 30,
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
