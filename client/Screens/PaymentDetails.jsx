import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ShippingTruck from "react-native-vector-icons/MaterialCommunityIcons";
import CheckCircle from "react-native-vector-icons/MaterialCommunityIcons";
import Payment from "react-native-vector-icons/MaterialIcons";
import { Button, RadioButton } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/orderSlice";
import { useNavigation } from "@react-navigation/native";
import { deleteAllCartItem } from "../features/cartSlice";
import Loader from "../Components/Loader";
const PaymentDetails = ({ nav, route }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { sum_total, shipping_charge, formData, user_id, grand_total } =
    route.params;
  const [paymentType, setPaymentType] = useState("cash_on_delivery");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvc, setCvc] = useState("");
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.order);
  const { loading, carts } = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const formattedDate = (e) => {
    const date = e.replace(/[^0-9]/g, "");
    if (date.length === 0) {
      setExpDate("");
      return;
    }
    const formattedDate = `${date.slice(0, 2)} / ${date.slice(2, 7)}`;
    setExpDate(formattedDate);
  };
  const paymentHandler = () => {
    const extractedData = carts.map((cart) => ({
      name: cart.product.name,
      quantity: cart.quantity,
      price: cart.product.price,
      product: cart.product.id, // Assuming _id is the product ID field
    }));

    if (paymentType === "cash_on_delivery") {
      const order = {
        shippingInfo: formData,
        orderItems: extractedData,
        user: user_id,
        paymentInfo: {
          method: "cash_on_delivery",
        },
        itemsPrice: sum_total,
        shippingPrice: shipping_charge,
        totalPrice: grand_total,
      };
      dispatch(createOrder(order));
      // alert("Order placed successfully.");
    } else if (paymentType === "card") {
      alert("Card");
    }
    setOrderPlaced(true);
  };

  useEffect(() => {
    if (success && orderPlaced === true) {
      alert("Order placed successfully");
      navigation.navigate("MyOrders");
      dispatch(deleteAllCartItem(user_id));
      setOrderPlaced(false);
    }
    if (error) {
      alert(error);
    }
  }, [success, error, navigation, dispatch, orderPlaced]);

  return (
    <ScrollView style={paymentStyle.paymentContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              <Text style={paymentStyle.shippingIconText}>
                Shipping Details
              </Text>
              <View style={paymentStyle.shippingTextLine}></View>

              <Text style={paymentStyle.shippingIconText}>Confirm Order</Text>
              <View style={paymentStyle.shippingTextLine}></View>

              <Text style={paymentStyle.shippingIconText}>Payment Details</Text>
            </View>
          </View>

          {/* ----------- MID CONTAINER  ----------- */}

          <View style={paymentStyle.bottomContainer}>
            <Text style={paymentStyle.shippingDetailHeading}>
              Payment Details
            </Text>

            {/* ----------- SELECT PAYMENT TYPE----------- */}
            <View style={paymentStyle.paymentType}>
              <Text style={paymentStyle.paymentTypeTxt}>
                Select Payment Type
              </Text>
              <RadioButton.Group
                value={paymentType}
                onValueChange={(e) => setPaymentType(e)}
              >
                <View style={paymentStyle.paymentMethod}>
                  <Text>Cash On Delivery</Text>
                  <RadioButton value="cash_on_delivery" />
                </View>
                <View style={paymentStyle.paymentMethod}>
                  <Text>Debit / Credit Card</Text>
                  <RadioButton value="card" />
                </View>
              </RadioButton.Group>
            </View>

            {/* ----------- FORM CONTAINER  ----------- */}
            <View style={paymentStyle.formContainer}>
              {paymentType === "card" ? (
                <>
                  <View style={paymentStyle.formItem}>
                    <Text style={paymentStyle.formLabel}>Card Number</Text>
                    <TextInput
                      style={paymentStyle.input}
                      placeholder="1234 1234 1234 1234"
                      inputMode="decimal"
                      value={cardNumber}
                      maxLength={16}
                      minLength={16}
                      onChangeText={setCardNumber}
                    />
                  </View>
                  <View style={paymentStyle.formItem}>
                    <Text style={paymentStyle.formLabel}>Expiry Date</Text>
                    <TextInput
                      style={paymentStyle.input}
                      placeholder="MM / YY"
                      inputMode="decimal"
                      value={expDate}
                      maxLength={7}
                      minLength={7}
                      onChangeText={formattedDate}
                    />
                  </View>
                  <View style={paymentStyle.formItem}>
                    <Text style={paymentStyle.formLabel}>CVC</Text>
                    <TextInput
                      style={paymentStyle.input}
                      placeholder="123"
                      inputMode="decimal"
                      maxLength={3}
                      value={cvc}
                      onChangeText={setCvc}
                    />
                  </View>
                </>
              ) : (
                <></>
              )}

              <Button
                onPress={paymentHandler}
                disabled={loading ? true : false}
                style={paymentStyle.continueBtn}
              >
                <Text style={paymentStyle.continueTxt}>
                  {paymentType === "card"
                    ? "Pay Nrs. " + grand_total.toFixed(2)
                    : "Place Order"}
                </Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default PaymentDetails;

const paymentStyle = StyleSheet.create({
  paymentContainer: {
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
    marginBottom: 50,
  },
  continueTxt: {
    fontSize: 18,
    color: "#FFFF",
  },
  paymentType: {
    alignItems: "center",
    marginBottom: 20,
  },
  paymentTypeTxt: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
  },
  paymentMethod: {
    padding: 10,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#a8a8",
    flexDirection: "row",
    alignItems: "center",
  },
});
