import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";

const MyOrders = () => {
  const orderStatus = "Delivered";
  return (
    <View style={orderStyle.myOrderContainer}>
      <Text style={orderStyle.orderHeader}>My Orders</Text>
      <View style={orderStyle.orderTableHead}>
        <Text style={orderStyle.theadTxt}>Order Id</Text>
        <Text style={orderStyle.theadTxt}>Status</Text>
        <Text style={orderStyle.theadTxt}>Quantity</Text>
        <Text style={orderStyle.theadTxt}>Price</Text>
        <Text style={orderStyle.theadTxt}>Total</Text>
      </View>
      <ScrollView>
        <View style={orderStyle.orderTableBody}>
          <Text style={orderStyle.tbodyTxt}>123456</Text>
          <Text
            style={
              orderStatus === "Processing"
                ? orderStyle.orderProcessing
                : orderStyle.orderRejected && orderStatus === "Delivered"
                ? orderStyle.orderDelivered
                : orderStyle.orderRejected && orderStatus === "Shipped"
                ? orderStyle.orderShipped
                : orderStyle.orderRejected
            }
          >
            {orderStatus}
          </Text>
          <Text style={orderStyle.tbodyTxt}>2</Text>
          <Text style={orderStyle.tbodyTxt}>7000</Text>
          <Text style={orderStyle.tbodyTxt}>14000</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyOrders;

const orderStyle = StyleSheet.create({
  myOrderContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  orderHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "#FFF",
  },
  orderTableHead: {
    marginTop: 20,
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    backgroundColor: "#FF6347",
  },

  theadTxt: {
    fontSize: 14,
    color: "#FFF",
  },

  orderTableBody: {
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  orderProcessing: {
    color: "#3B71CA",
  },
  orderDelivered: {
    color: "#14A44D",
  },
  orderShipped: {
    color: "#E4A11B",
  },
  orderRejected: {
    color: "#DC4C64",
  },
});
