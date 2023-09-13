import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import ShippingTruck from "react-native-vector-icons/MaterialCommunityIcons";
import CheckCircle from "react-native-vector-icons/MaterialCommunityIcons";
import Payment from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Shipping = ({ nav, route }) => {
  const { user_id } = route.params;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const continueBtnHandler = () => {
    const formData = {
      email,
      contact,
      address,
      province,
      city,
      zipCode,
    };
    navigation.navigate("ConfirmOrder", { formData, user_id });
  };

  return (
    <View style={shippingStyle.shippingContainer}>
      <View style={shippingStyle.shippingTopContainer}>
        <View style={shippingStyle.shippingIconContainer}>
          <ShippingTruck
            name="truck-fast"
            size={35}
            style={shippingStyle.shippingIcons1}
          />

          <View style={shippingStyle.shippingHrLine}></View>
          <CheckCircle
            name="check-circle"
            size={35}
            style={shippingStyle.shippingIcons2}
          />
          <View style={shippingStyle.shippingHrLine}></View>
          <Payment
            name="payment"
            size={35}
            style={shippingStyle.shippingIcons3}
          />
        </View>
        <View style={shippingStyle.shippingIconTextContainer}>
          <Text style={shippingStyle.shippingIconText}>Shipping Details</Text>
          <View style={shippingStyle.shippingTextLine}></View>

          <Text style={shippingStyle.shippingIconText}>Confirm Order</Text>
          <View style={shippingStyle.shippingTextLine}></View>

          <Text style={shippingStyle.shippingIconText}>Payment Details</Text>
        </View>
      </View>

      <View style={shippingStyle.bottomContainer}>
        <Text style={shippingStyle.shippingDetailHeading}>
          Shipping Details
        </Text>

        <View style={shippingStyle.formContainer}>
          <TextInput
            style={shippingStyle.input}
            inputMode="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={shippingStyle.input}
            inputMode="tel"
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            style={shippingStyle.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={shippingStyle.input}
            placeholder="Province"
            value={province}
            onChangeText={setProvince}
          />
          <TextInput
            style={shippingStyle.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={shippingStyle.input}
            placeholder="Zip Code"
            value={zipCode}
            onChangeText={setZipCode}
          />

          <Button
            onPress={continueBtnHandler}
            style={shippingStyle.continueBtn}
          >
            <Text style={shippingStyle.continueTxt}>Continue</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Shipping;

const shippingStyle = StyleSheet.create({
  shippingContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  shippingTopContainer: {
    padding: 20,
  },
  shippingIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shippingHrLine: {
    height: 2,
    backgroundColor: "#AAA8",
    width: 100,
    marginHorizontal: 5,
  },
  shippingIconTextContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  shippingIcons1: {
    color: "#FF6347",
  },
  shippingIconText: {
    fontSize: 10,
  },
  shippingTextLine: {
    height: 2,
    width: 50,
    marginHorizontal: 5,
  },

  bottomContainer: {
    marginVertical: 5,
  },
  shippingDetailHeading: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  formContainer: {
    alignItems: "center",
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
    width: "80%",
  },

  continueBtn: {
    padding: 5,
    backgroundColor: "#FF6347",
    width: "80%",
    borderRadius: 8,
  },
  continueTxt: {
    color: "#FFFF",
  },
});
