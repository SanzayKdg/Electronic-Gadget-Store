import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import ShippingTruck from "react-native-vector-icons/MaterialCommunityIcons";
import CheckCircle from "react-native-vector-icons/MaterialCommunityIcons";
import Payment from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { getCartItems } from "../features/cartSlice";

const ConfirmOrder = ({ nav, route }) => {
  const navigation = useNavigation();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading, carts, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cart_total_amount =
    carts &&
    carts.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

  const sub_total = cart_total_amount / 1.13;
  const vat_amount = sub_total * 0.13;
  const shipping_charge = 100;
  const sum_total = sub_total + vat_amount;
  const grand_total = sum_total + shipping_charge;
  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      dispatch(getCartItems(user._id));
    }
  }, [dispatch, error]);

  const { formData, user_id } = route.params;

  const paymentProcessHandler = () => {
    navigation.navigate("PaymentDetails", {
      sum_total,
      shipping_charge,
      formData,
      user_id,
      grand_total,
    });
  };

  return (
    <ScrollView style={confirmOrderStyle.confirmOrderContainer}>
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
            <Text>Name: </Text>
            <Text>{formData.email}</Text>
          </View>
          <View style={confirmOrderStyle.userDetailContainer}>
            <Text>Contact: </Text>
            <Text>{formData.contact}</Text>
          </View>
          <View style={confirmOrderStyle.userDetailContainer}>
            <Text>Address: </Text>
            <Text>
              {formData.address}, {formData.province}, {formData.city},{" "}
              {formData.zipCode}
            </Text>
          </View>
        </View>

        {/* ----------- CART ITEMS ----------- */}

        <View style={{ marginVertical: 10 }}>
          <Text style={confirmOrderStyle.shippingDetailHeading}>
            Your Cart Items
          </Text>

          {loading ? (
            <Loader />
          ) : (
            <>
              {carts &&
                carts.map((item, index) => (
                  <View key={index} style={confirmOrderStyle.itemsContainer}>
                    <View style={confirmOrderStyle.cartItems}>
                      <Image
                        source={{ uri: item.product.image }}
                        style={confirmOrderStyle.cartImage}
                      />
                      <Text>
                        {item.quantity}x Nrs. {item.product.price}
                      </Text>
                      <Text>Nrs. {item.quantity * item.product.price}</Text>
                    </View>
                  </View>
                ))}
            </>
          )}
        </View>

        {/* -----------ORDER SUMMARY  ----------- */}

        {loading ? (
          <Loader />
        ) : (
          <View style={confirmOrderStyle.orderSummaryContainer}>
            <Text style={confirmOrderStyle.shippingDetailHeading}>
              Order Summary
            </Text>

            <View style={confirmOrderStyle.orderDetails}>
              <Text>Subtotal </Text>
              <Text>Nrs. {sub_total.toFixed(2)}</Text>
            </View>
            <View style={confirmOrderStyle.orderDetails}>
              <Text>13% VAT </Text>
              <Text>Nrs. {vat_amount.toFixed(2)}</Text>
            </View>
            <View style={confirmOrderStyle.orderDetails}>
              <Text>Shipping Charges </Text>
              <Text>Nrs. {shipping_charge.toFixed(2)}</Text>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <View style={confirmOrderStyle.totalHrLine}></View>
            </View>

            <View style={confirmOrderStyle.orderDetails}>
              <Text style={confirmOrderStyle.totalText}>Grand Total</Text>
              <Text style={confirmOrderStyle.totalText}>
                Nrs. {grand_total}
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            alignItems: "center",
            marginVertical: 10,
            marginBottom: 50,
          }}
        >
          <Button
            onPress={paymentProcessHandler}
            style={confirmOrderStyle.continueBtn}
          >
            <Text style={confirmOrderStyle.continueTxt}>Proceed To Pay</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmOrder;

const confirmOrderStyle = StyleSheet.create({
  confirmOrderContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingBottom: 100,
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
