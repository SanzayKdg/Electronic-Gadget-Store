import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Slider, Icon } from "@rneui/base";
import { ListItem } from "@rneui/themed";
import { Rating } from "react-native-elements";
import { laptops, smartphones } from "../extras/categories";
import { Card } from "react-native-paper";
import Filter from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getAllProducts } from "../features/productSlice";

const Products = ({ navigation, route }) => {
  const keyword = route.params?.keyword;
  const category_params = route.params?.category;

  const [ratings, setRatings] = useState(0);
  const [price, setPrice] = useState([0, 300000]);
  const [expanded, setExpanded] = useState(false);
  const [catExpanded, setCatExpanded] = useState(false);
  const [phonesExpanded, setPhonesExpanded] = useState(false);
  const [laptopsExpanded, setLaptopsExpanded] = useState(false);
  const [category, setCategory] = useState(
    category_params ? category_params : ""
  );

  const { loading, products, error } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert(error);
    }

    dispatch(getAllProducts({ keyword, price, category, ratings }));
  }, [error, dispatch, keyword, price, category, ratings]);

  return (
    <ScrollView style={productsStyle.productContainer}>
      <Header />

      {/* --------------------------- FILTER CONTAINER -------------------------------------- */}
      <View style={productsStyle.filterCollapse}>
        <ListItem.Accordion
          content={
            <>
              <Filter name="filter" size={30} />
              <ListItem.Content style={{ alignItems: "center" }}>
                <ListItem.Title style={{ fontSize: 20 }}>Filter</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          {/* --------------------------- PRICE FILTER -------------------------------------- */}

          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={productsStyle.priceSlider}>
                <Text>Price: </Text>

                <Text style={{ color: "#a8a8a8" }}>From: </Text>
                <TextInput
                  inputMode="decimal" // Set the input mode to "decimal"
                  placeholder="From"
                  value={price[0].toString()} // Convert the number to a string
                  onChangeText={(text) => {
                    const newValue = text === "" ? 0 : parseFloat(text); // Use parseFloat for decimal values
                    setPrice([newValue, price[1]]);
                  }}
                  style={productsStyle.priceInput}
                />
                <Text style={{ color: "#a8a8a8" }}>To: </Text>

                <TextInput
                  inputMode="decimal" // Set the input mode to "decimal"
                  placeholder="To"
                  value={price[1].toString()} // Convert the number to a string
                  onChangeText={(text) => {
                    const newValue = text === "" ? 0 : parseFloat(text); // Use parseFloat for decimal values
                    setPrice([price[0], newValue]);
                  }}
                  style={productsStyle.priceInput}
                />
              </View>
            </ListItem.Content>
          </ListItem>

          {/* --------------------------- RATING FILTER -------------------------------------- */}

          <ListItem bottomDivider>
            <ListItem.Content>
              <View style={productsStyle.priceSlider}>
                <Text>Ratings:</Text>
                <Slider
                  animateTransitions
                  animationType="timing"
                  maximumTrackTintColor="#ccc"
                  maximumValue={5}
                  minimumTrackTintColor="#222"
                  minimumValue={0}
                  onValueChange={(value) => setRatings(value)}
                  orientation="horizontal"
                  step={1}
                  style={{ width: "60%" }}
                  thumbStyle={{ height: 1, width: 1 }}
                  thumbProps={{
                    children: (
                      <Icon
                        type="font-awesome"
                        size={10}
                        reverse
                        containerStyle={{ bottom: 20, right: 20 }}
                        color="#f50"
                      />
                    ),
                  }}
                  thumbTintColor="#FF6347"
                  thumbTouchSize={{ width: 80, height: 80 }}
                  trackStyle={{ height: 10, borderRadius: 20 }}
                  value={0}
                />
                <Text>{ratings}</Text>
              </View>
            </ListItem.Content>
          </ListItem>

          {/* --------------------------- CATEGORIES FILTER -------------------------------------- */}

          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 14 }}>
                    Categories
                  </ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={catExpanded}
            onPress={() => {
              setCatExpanded(!catExpanded);
            }}
          >
            {/* ------------ SMARTPHONES ACCORDION ---------------------- */}
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 14 }}>
                      SmartPhones
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={phonesExpanded}
              onPress={() => {
                setPhonesExpanded(!phonesExpanded);
              }}
            >
              {smartphones &&
                smartphones.map((item, index) => (
                  <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <TouchableOpacity onPress={() => setCategory(item.name)}>
                        <Text> {item.name}</Text>
                      </TouchableOpacity>
                    </ListItem.Content>
                  </ListItem>
                ))}
            </ListItem.Accordion>

            {/* ------------ LAPTOPS ACCORDION ---------------------- */}
            <ListItem.Accordion
              content={
                <>
                  <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 14 }}>
                      Laptops
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={laptopsExpanded}
              onPress={() => {
                setLaptopsExpanded(!laptopsExpanded);
              }}
            >
              {laptops &&
                laptops.map((item, index) => (
                  <ListItem key={index} bottomDivider>
                    <ListItem.Content>
                      <TouchableOpacity onPress={() => setCategory(item.name)}>
                        <Text> {item.name}</Text>
                      </TouchableOpacity>
                    </ListItem.Content>
                  </ListItem>
                ))}
            </ListItem.Accordion>
          </ListItem.Accordion>
        </ListItem.Accordion>
      </View>

      {/* --------------------------- PRODUCTS DISPLAY -------------------------------------- */}

      {loading ? (
        <Loader />
      ) : (
        <View style={productsStyle.productList}>
          {products &&
            products.map((item, index) => (
              <Card
                onPress={() => navigation.navigate("Product", { id: item._id })}
                key={index}
                style={productsStyle.cardView}
              >
                <Image
                  style={productsStyle.productImage}
                  source={{ uri: item.images[0].url }}
                />
                <View style={productsStyle.productDesc}>
                  <Text style={productsStyle.productDescItem}>{item.name}</Text>
                  <Text style={productsStyle.productDescItem}>
                    {item.price}
                  </Text>
                  <Rating
                    startingValue={item.ratings}
                    ratingCount={5}
                    imageSize={25}
                    style={productsStyle.productDescItem}
                    readonly
                  />
                </View>
              </Card>
            ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Products;
const productsStyle = StyleSheet.create({
  productContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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

  productList: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingBottom: 30,
  },
  filterCollapse: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 12,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
  },

  priceSlider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  priceInput: {
    borderWidth: 0.5,
    padding: 5,
  },
});
