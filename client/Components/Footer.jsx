import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import Home from "react-native-vector-icons/Fontisto";
import Cart from "react-native-vector-icons/FontAwesome";
import Person from "react-native-vector-icons/MaterialIcons";
import Shop from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/core";
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={footerStyle.footerContainer}>
      <TouchableOpacity
        style={footerStyle.footerIconContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Home name="home" size={25} style={footerStyle.footerIcon} />
        <Text style={footerStyle.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={footerStyle.footerIconContainer}
        onPress={() => navigation.navigate("Products")}
      >
        <Shop name="shop" size={25} style={footerStyle.footerIcon} />
        <Text style={footerStyle.footerText}>Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={footerStyle.footerIconContainer}
        onPress={() => navigation.navigate("Cart")}
      >
        <Cart name="shopping-cart" size={25} style={footerStyle.footerIcon} />
        <Text style={footerStyle.footerText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={footerStyle.footerIconContainer}
        onPress={() => navigation.navigate("Account")}
      >
        <Person name="person" size={25} style={footerStyle.footerIcon} />
        <Text style={footerStyle.footerText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const footerStyle = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
  footerIconContainer: {
    alignItems: "center",
  },
  footerIcon: {
    color: "#808080",
    marginBottom: 2,
  },
  footerText: {
    color: "#808080",
    fontSize: 12,
  },
});
