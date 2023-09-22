import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAsync } from "../features/orderSlice";
import Loader from "../Components/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    if (isAuthenticated) {
      dispatch(getAllOrdersAsync());
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <View style={orderStyle.myOrderContainer}>
      <Text style={orderStyle.orderHeader}>My Orders</Text>
      <View style={orderStyle.orderTableHead}>
        <Text style={orderStyle.theadTxt}>Order Id</Text>
        <Text style={orderStyle.theadTxt}>Status</Text>
        <Text style={orderStyle.theadTxt}>Payment Method</Text>
        <Text style={orderStyle.theadTxt}>Price</Text>
        <Text style={orderStyle.theadTxt}>Total</Text>
      </View>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <>
            {orders &&
              orders.map((item, index) => (
                <View key={index} style={orderStyle.orderTableBody}>
                  <Text style={orderStyle.tbodyTxt}>{item.paymentInfo.id}</Text>
                  <Text
                    style={
                      item.orderStatus === "Processing"
                        ? orderStyle.orderProcessing
                        : orderStyle.orderRejected &&
                          item.orderStatus === "Delivered"
                        ? orderStyle.orderDelivered
                        : orderStyle.orderRejected &&
                          item.orderStatus === "Shipped"
                        ? orderStyle.orderShipped
                        : orderStyle.orderRejected
                    }
                  >
                    {item.orderStatus}
                  </Text>
                  <Text
                    style={
                      item.paymentInfo.method === "card"
                        ? orderStyle.payment_card
                        : orderStyle.payment_cashOnDelivery
                    }
                  >
                    {item.paymentInfo.method === "cash_on_delivery" ? (
                      <>Cash on Delivery</>
                    ) : (
                      <>Card</>
                    )}
                  </Text>
                  <Text style={orderStyle.tbodyTxt}>
                    {item.itemsPrice.toFixed(0)}
                  </Text>
                  <Text style={orderStyle.tbodyTxt}>
                    {item.totalPrice.toFixed(0)}
                  </Text>
                </View>
              ))}
          </>
        )}
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
    alignItems: "center",
  },
  orderProcessing: {
    fontSize: 10,
    color: "#3B71CA",
  },
  orderDelivered: {
    fontSize: 10,
    color: "#14A44D",
  },
  orderShipped: {
    fontSize: 10,
    color: "#E4A11B",
  },
  orderRejected: {
    fontSize: 10,
    color: "#DC4C64",
  },

  tbodyTxt: {
    fontSize: 10,
  },
  payment_card: { fontSize: 10, color: "#14A44D" },
  payment_cashOnDelivery: {
    fontSize: 10,
    color: "#E4A11B",
  },
});
