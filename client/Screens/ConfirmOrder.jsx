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
import { useNavigation } from "@react-navigation/native";

const ConfirmOrder = () => {
    const navigation = useNavigation()
const paymentProcessHandler =()=> {
    navigation.navigate('PaymentDetails')
}

  return (
    <View style={confirmOrderStyle.confirmOrderContainer}>
      {/*  ----------- TOP SECTION ----------- */}

      <View style={confirmOrderStyle.shippingTopContainer}>
        <View style={confirmOrderStyle.shippingIconContainer}>
          <ShippingTruck
            name="truck-fast"
            size={35}
            style={confirmOrderStyle.shippingIcons}
          />

          <View style={confirmOrderStyle.shippingHrLine}></View>
          <CheckCircle
            name="check-circle"
            size={35}
            style={confirmOrderStyle.shippingIcons}
          />
          <View style={confirmOrderStyle.shippingHrLine}></View>
          <Payment
            name="payment"
            size={35}
            style={confirmOrderStyle.shippingIcons3}
          />
        </View>
        <View style={confirmOrderStyle.shippingIconTextContainer}>
          <Text style={confirmOrderStyle.shippingIconText}>
            Shipping Details
          </Text>
          <View style={confirmOrderStyle.shippingTextLine}></View>

          <Text style={confirmOrderStyle.shippingIconText}>Confirm Order</Text>
          <View style={confirmOrderStyle.shippingTextLine}></View>

          <Text style={confirmOrderStyle.shippingIconText}>
            Payment Details
          </Text>
        </View>
      </View>

      {/*  ----------- MID SECTION ----------- */}
      <View style={confirmOrderStyle.midContainer}>
        <View style={{ marginVertical: 10 }}>
          {/* -----------SHIPPING INFO  ----------- */}

          <Text style={confirmOrderStyle.shippingDetailHeading}>
            Shipping Info
          </Text>

          <View style={confirmOrderStyle.userDetailContainer}>
            <Text>Name:</Text>
            <Text>Demo User</Text>
          </View>
          <View style={confirmOrderStyle.userDetailContainer}>
            <Text>Contact: </Text>
            <Text>9876543210</Text>
          </View>
          <View style={confirmOrderStyle.userDetailContainer}>
            <Text>Address:</Text>
            <Text>kathmandu, kathmandu, BA, 44705, NP</Text>
          </View>
        </View>

        {/* ----------- CART ITEMS ----------- */}

        <View style={{ marginVertical: 10 }}>
          <Text style={confirmOrderStyle.shippingDetailHeading}>
            Your Cart Items
          </Text>

          <View style={confirmOrderStyle.itemsContainer}>
            <View style={confirmOrderStyle.cartItems}>
              <Image
                source={require("../images/products/smartphones/Apple/iPhone-14-Pro-Max-black.jpg")}
                style={confirmOrderStyle.cartImage}
              />
              <Text>1 x Nrs. 45000</Text>
              <Text>Rs. 45000</Text>
            </View>
            <View style={confirmOrderStyle.cartItems}>
              <Image
                source={require("../images/products/smartphones/Apple/iPhone-14-Pro-Max-black.jpg")}
                style={confirmOrderStyle.cartImage}
              />
              <Text>1 x Nrs. 45000</Text>
              <Text>Rs. 45000</Text>
            </View>
          </View>
        </View>

        {/* -----------ORDER SUMMARY  ----------- */}

        <View style={confirmOrderStyle.orderSummaryContainer}>
          <Text style={confirmOrderStyle.shippingDetailHeading}>
            Order Summary
          </Text>

          <View style={confirmOrderStyle.orderDetails}>
            <Text>Subtotal </Text>
            <Text>Nrs. 525477.87</Text>
          </View>
          <View style={confirmOrderStyle.orderDetails}>
            <Text>13% VAT </Text>
            <Text>Nrs. 68312.12</Text>
          </View>
          <View style={confirmOrderStyle.orderDetails}>
            <Text>Shipping Charges </Text>
            <Text>Nrs. 0</Text>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            <View style={confirmOrderStyle.totalHrLine}></View>
          </View>

          <View style={confirmOrderStyle.orderDetails}>
            <Text style={confirmOrderStyle.totalText}>Total </Text>
            <Text style={confirmOrderStyle.totalText}>Nrs. 593990</Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Button onPress={paymentProcessHandler} style={confirmOrderStyle.continueBtn}>
            <Text style={confirmOrderStyle.continueTxt}>Proceed To Pay</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default ConfirmOrder;

const confirmOrderStyle = StyleSheet.create({
  confirmOrderContainer: {
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
  midContainer: {
    marginVertical: 5,
  },
  bottomContainer: {
    marginVertical: 5,
  },
  shippingDetailHeading: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 8,
  },

  userDetailContainer: {
    flexDirection: "row",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  itemsContainer: {
    overflow: "scroll",
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

  orderDetails: {
    paddingHorizontal: 20,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 18,
  },
  totalHrLine: {
    height: 2,
    backgroundColor: "#AAA8",
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
