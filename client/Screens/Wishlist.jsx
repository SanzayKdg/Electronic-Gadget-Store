import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import Right from "react-native-vector-icons/FontAwesome";
const Wishlist = () => {
  const stock = 0;
  return (
    <View style={wishlistStyle.wishlistContainer}>
      <Text style={wishlistStyle.wishlistHeader}>My Wishlist</Text>

      <ScrollView style={wishlistStyle.wishlistItemContainer}>
        <View style={wishlistStyle.wishlistItem}>
          <Image
            source={require("../images/products/smartphones/Apple/iPhone-14-Pro-Max-black.jpg")}
            style={wishlistStyle.cartImage}
          />

          <View>
            <Text style={{ marginVertical: 2.5 }}>
              Iphone 14 Pro Max 256 GB
            </Text>
            <Text style={{ marginVertical: 2.5 }}>Rs. 2450000</Text>

            <View style={wishlistStyle.wishlistActions}>
              <Text style={wishlistStyle.outOfStock}>Remove</Text>
              <Text
                style={
                  stock === 0 ? wishlistStyle.outOfStock : wishlistStyle.inStock
                }
              >
                {stock === 0 ? "Out Of Stock" : "In Stock"}
              </Text>
            </View>
          </View>

          <Right name="chevron-right" size={30} color={"#0009"} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Wishlist;

const wishlistStyle = StyleSheet.create({
  wishlistContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wishlistHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "#FFF",
  },

  wishlistItemContainer: {
    padding: 20,
  },
  wishlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    padding: 20,
    alignItems: "center",
  },
  cartImage: {
    width: 60,
    height: 60,
  },

  wishlistActions: {
    flexDirection: "row",
    marginTop: 5,
  },
  outOfStock: {
    color: "#DC4C64",
    marginRight: 5,
  },
  inStock: {
    color: "#14A44D",
    marginHorizontal: 5,
  },
});
