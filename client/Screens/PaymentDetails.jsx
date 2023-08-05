import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import ShippingTruck from "react-native-vector-icons/MaterialCommunityIcons";
import CheckCircle from "react-native-vector-icons/MaterialCommunityIcons";
import Payment from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";

const PaymentDetails = () => {
  const paymentHandler = () => {
    console.log("he");
  };
  return (
    <View style={paymentStyle.paymentContainer}>
      {/* ----------- TOP CONTAINER  ----------- */}

      <View style={paymentStyle.shippingTopContainer}>
        <View style={paymentStyle.shippingIconContainer}>
          <ShippingTruck
            name="truck-fast"
            size={35}
            style={paymentStyle.shippingIcons}
          />

          <View style={paymentStyle.shippingHrLine}></View>
          <CheckCircle
            name="check-circle"
            size={35}
            style={paymentStyle.shippingIcons}
          />
          <View style={paymentStyle.shippingHrLine}></View>
          <Payment
            name="payment"
            size={35}
            style={paymentStyle.shippingIcons}
          />
        </View>
        <View style={paymentStyle.shippingIconTextContainer}>
          <Text style={paymentStyle.shippingIconText}>Shipping Details</Text>
          <View style={paymentStyle.shippingTextLine}></View>

          <Text style={paymentStyle.shippingIconText}>Confirm Order</Text>
          <View style={paymentStyle.shippingTextLine}></View>

          <Text style={paymentStyle.shippingIconText}>Payment Details</Text>
        </View>
      </View>

      {/* ----------- MID CONTAINER  ----------- */}

      <View style={paymentStyle.bottomContainer}>
        <Text style={paymentStyle.shippingDetailHeading}>Payment Details</Text>

        {/* ----------- FORM CONTAINER  ----------- */}
        <View style={paymentStyle.formContainer}>
          <View style={paymentStyle.formItem}>
            <Text style={paymentStyle.formLabel}>Card Number</Text>
            <TextInput
              style={paymentStyle.input}
              placeholder="1234 1234 1234 1234"
            />
          </View>
          <View style={paymentStyle.formItem}>
            <Text style={paymentStyle.formLabel}>Expiry Date</Text>
            <TextInput style={paymentStyle.input} placeholder="MM / YY" />
          </View>
          <View style={paymentStyle.formItem}>
            <Text style={paymentStyle.formLabel}>CVC</Text>
            <TextInput style={paymentStyle.input} placeholder="123" />
          </View>

          <Button onPress={paymentHandler} style={paymentStyle.continueBtn}>
            <Text style={paymentStyle.continueTxt}>Pay Nrs. 450000</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetails;

const paymentStyle = StyleSheet.create({
  paymentContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 100,
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
  shippingIcons: {
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
    marginVertical: 20,
  },
  formContainer: {
    alignItems: "center",
  },
  formItem: {
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  formLabel: {
    textAlign: "left",
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
    width: "100%",
  },

  continueBtn: {
    padding: 5,
    backgroundColor: "#FF6347",
    width: "90%",
    borderRadius: 8,
  },
  continueTxt: {
    fontSize: 18,
    color: "#FFFF",
  },
});
