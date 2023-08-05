import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import Add from "react-native-vector-icons/Ionicons";
import Subtract from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";

const Cart = () => {
  const navigation = useNavigation();
  const checkoutHandler = () => {
    navigation.navigate("Shipping");
  };
  return (
    <View style={cartStyle.cartContainer}>
      <View style={cartStyle.topView}>
        <Text style={cartStyle.textTop}>Product</Text>
        <Text style={cartStyle.textTop}>Quantity</Text>
        <Text style={cartStyle.textTop}>Total</Text>
      </View>

      <View style={cartStyle.cartItemsContainer}>
        <View style={cartStyle.cartItems}>
          <Image
            source={require("../images/products/smartphones/Apple/iPhone-14-Pro-Max-black.jpg")}
            style={cartStyle.cartImage}
          />

          <View style={cartStyle.quantityContainer}>
            <Add name="add" size={20} style={cartStyle.qtyBtn} />
            <TextInput style={cartStyle.qtyInput} />
            <Subtract name="minus" size={20} style={cartStyle.qtyBtn} />
          </View>

          <Text>Rs. 45000</Text>
        </View>
      </View>

      <View style={cartStyle.bottomView}>
        <View style={cartStyle.hrLine}></View>
        <View style={cartStyle.totalContainer}>
          <Text style={cartStyle.totalText}>Total</Text>
          <Text style={cartStyle.totalText}>Rs. 45000</Text>
        </View>

        <View style={cartStyle.checkoutBtnContainer}>
          <Button onPress={checkoutHandler} style={cartStyle.checkOutBtn}>
            <Text style={cartStyle.checkoutTxt}>Checkout</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const cartStyle = StyleSheet.create({
  cartContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 100,
  },

  topView: {
    padding: 20,
    backgroundColor: "#FF6347",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTop: {
    color: "#FFFF",
    fontSize: 15,
  },
  cartItemsContainer: {
    position: "relative",
  },

  cartItems: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cartImage: {
    width: 50,
    height: 50,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },

  qtyBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AAA8",
    height: 20,
    width: 20,
  },

  qtyInput: {
    backgroundColor: "#fff",
    width: 30,
    textAlign: "center",
  },
  bottomView: {},
  hrLine: {
    height: 10,
    backgroundColor: "#FF6347",
  },

  totalContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 17,
  },
  checkoutBtnContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  checkOutBtn: {
    backgroundColor: "#FF6347",
  },
  checkoutTxt: {
    fontSize: 18,
    color: "#FFF",
  },
});
