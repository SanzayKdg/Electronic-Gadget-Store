import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import Add from "react-native-vector-icons/Ionicons";
import Subtract from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "../features/cartSlice";

const Cart = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading, carts, error } = useSelector((state) => state.cart);
  const navigation = useNavigation();

  const checkoutHandler = () => {
    navigation.navigate("Shipping", { user_id: user._id });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert(error);
    }

    if (isAuthenticated) {
      dispatch(getCartItems(user._id));
    }
  }, [dispatch, error]);

  return (
    <>
      {!isAuthenticated ? (
        <View style={cartStyle.isNotAuthenticated}>
          <Text style={cartStyle.isNotAuthenticatedTxt}>
            Please login first to view your carts
          </Text>
          <Text style={cartStyle.isNotAuthenticatedText}>
            Welcome, to GadgetBiz
          </Text>

          <Button
            onPress={() => navigation.navigate("Login")}
            style={cartStyle.loginBtn}
            textColor="#FF6347"
          >
            <Text style={cartStyle.loginTxt}>Login/Sign Up</Text>
          </Button>

          <Text style={cartStyle.aboutUsText}>
            GadgetBiz is a portal that allows the seller to advertise their
            products on the internet. It can be conducted on any device like
            computers, smartphones, tablets, or any other smart devices.
          </Text>
        </View>
      ) : (
        <>
          <View style={cartStyle.cartContainer}>
            {loading ? (
              <Loader />
            ) : (
              <ScrollView>
                <View style={cartStyle.topView}>
                  <Text style={cartStyle.textTop}>Product</Text>
                  <Text style={cartStyle.textTop}>Quantity</Text>
                  <Text style={cartStyle.textTop}>Amount</Text>
                </View>

                <View style={cartStyle.cartItemsContainer}>
                  {carts &&
                    carts.map((item, index) => (
                      <View key={index} style={cartStyle.cartItems}>
                        <View style={cartStyle.productDetailsContainer}>
                          <Image
                            source={{ uri: item.product.image }}
                            style={cartStyle.cartImage}
                          />

                          <View style={cartStyle.productDescView}>
                            <Text style={cartStyle.productNameTxt}>
                              {item.product.name.slice(0, 20)}...
                            </Text>
                            <Text
                              style={cartStyle.remove}
                              onPress={async () => {
                                await dispatch(deleteCartItem(item.cart_id));
                                await dispatch(getCartItems(user._id));
                              }}
                            >
                              Remove
                            </Text>
                          </View>
                        </View>

                        <View style={cartStyle.quantityContainer}>
                          <Add
                            name="add"
                            size={20}
                            style={cartStyle.qtyBtn}
                            onPress={async () => {
                              const cartId = item.cart_id;
                              const quantity = Number(item.quantity + 1);
                              await dispatch(
                                updateCartItem({ cartId, quantity })
                              );
                              await dispatch(getCartItems(user._id));
                            }}
                          />
                          <Text style={cartStyle.qtyInput}>
                            {item.quantity}
                          </Text>
                          <Subtract
                            name="minus"
                            size={20}
                            style={cartStyle.qtyBtn}
                            onPress={async () => {
                              const cartId = item.cart_id;
                              const quantity = Number(item.quantity - 1);
                              await dispatch(
                                updateCartItem({ cartId, quantity })
                              );
                              await dispatch(getCartItems(user._id));
                            }}
                          />
                        </View>

                        <Text>Rs. {item.quantity * item.product.price}</Text>
                      </View>
                    ))}
                </View>

                <View style={cartStyle.bottomView}>
                  <View style={cartStyle.hrLine}></View>

                  <View style={cartStyle.checkoutBtnContainer}>
                    <Button
                      onPress={checkoutHandler}
                      style={cartStyle.checkOutBtn}
                    >
                      <Text style={cartStyle.checkoutTxt}>Checkout</Text>
                    </Button>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default Cart;

const cartStyle = StyleSheet.create({
  cartContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  productDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },

  remove: {
    marginTop: 5,
    fontSize: 12,
    color: "#DC4C64",
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
  isNotAuthenticated: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 10,
  },
  isNotAuthenticatedTxt: {
    fontSize: 20,
    marginVertical: 20,
    color: "#fff",
  },

  isNotAuthenticatedContainer: {
    backgroundColor: "#FF6347",
    padding: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  isNotAuthenticatedText: {
    fontSize: 24,
    color: "#fff",
  },
  loginBtn: {
    backgroundColor: "#fff",
    width: "50%",
    borderRadius: 8,
    marginVertical: 20,
  },
  loginTxt: {
    fontSize: 18,
  },

  aboutUsText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },

  productNameTxt: {
    width: "60%",
  },
});
