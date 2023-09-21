import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import Logout from "react-native-vector-icons/MaterialIcons";
import Orders from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "react-native-vector-icons/FontAwesome";
import Wishlist from "react-native-vector-icons/AntDesign";
import Message from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, logoutAsync } from "../features/authSlice";
import { getProfileAsync } from "../features/userSlice";

const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  // const { user, error, isAuthenticated } = useSelector((state) => state.auth);
  const { user, error, isAuthenticated, loading, message } = useSelector(
    (state) => state.user
  );
  // ----------- LOAD USER --------------

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (isAuthenticated) {
      dispatch(getProfileAsync());
    }
  }, [error, dispatch, isAuthenticated]);

  // ----------- LOGOUT --------------
  const logoutHandler = () => {
    dispatch(logoutAsync());
    navigation.navigate("Login");
  };
  return (
    <View style={accountStyle.accountContainer}>
      <SafeAreaView>
        {isAuthenticated ? (
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                <View style={accountStyle.userSection}>
                  <View style={accountStyle.topSection}>
                    <View style={accountStyle.userDescContainer}>
                      <Image
                        style={accountStyle.userImage}
                        source={{
                          uri: user.avatar.url ? user.avatar.url : null,
                        }}
                      />
                      <View style={accountStyle.userDesc}>
                        <Text style={accountStyle.textItemHead}>
                          {user.name}
                        </Text>
                        <Text style={accountStyle.textItems}>{user.email}</Text>
                        <Text style={accountStyle.textItems}>
                          {user.contact}
                        </Text>
                        <Text style={accountStyle.textItems1}>
                          User Since: {user.createdAt}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity onPress={logoutHandler}>
                      <Logout
                        name="exit-to-app"
                        size={30}
                        style={accountStyle.midCategoryIcons}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={accountStyle.midSection}>
                    <TouchableOpacity style={accountStyle.midCategory}>
                      <Orders
                        name="format-list-bulleted"
                        size={25}
                        style={accountStyle.midCategoryIcons}
                      />
                      <Text style={accountStyle.textItems}>Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={accountStyle.midCategory}>
                      <Cart
                        name="shopping-cart"
                        size={25}
                        style={accountStyle.midCategoryIcons}
                      />
                      <Text style={accountStyle.textItems}>Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={accountStyle.midCategory}>
                      <Wishlist
                        name="heart"
                        size={25}
                        style={accountStyle.midCategoryIcons}
                      />
                      <Text style={accountStyle.textItems}>Wishlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={accountStyle.midCategory}>
                      <Message
                        name="message"
                        size={25}
                        style={accountStyle.midCategoryIcons}
                      />
                      <Text style={accountStyle.textItems}>Message</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={accountStyle.bottomSection}>
                    <Button
                      onPress={() => navigation.navigate("UpdateProfile")}
                      style={accountStyle.accountBtn}
                    >
                      <Text style={accountStyle.accountBtnTxt}>
                        Update Profile
                      </Text>
                    </Button>
                    <Button
                      onPress={() => navigation.navigate("ChangePassword")}
                      style={accountStyle.accountBtn}
                    >
                      <Text style={accountStyle.accountBtnTxt}>
                        Change Password
                      </Text>
                    </Button>
                    {user.verified === true ? (
                      <></>
                    ) : (
                      <Button
                        onPress={() => navigation.navigate("Verify")}
                        style={accountStyle.accountBtn}
                      >
                        <Text style={accountStyle.accountBtnTxt}>
                          Verify Account
                        </Text>
                      </Button>
                    )}
                  </View>
                </View>
              </>
            )}
          </>
        ) : (
          <View style={accountStyle.isNotAuthenticatedContainer}>
            <Text style={accountStyle.isNotAuthenticatedText}>
              Welcome, to GadgetBiz
            </Text>

            <Button
              onPress={() => navigation.navigate("Login")}
              style={accountStyle.loginBtn}
              textColor="#FF6347"
            >
              <Text style={accountStyle.loginTxt}>Login/Sign Up</Text>
            </Button>

            <Text style={accountStyle.aboutUsText}>
              GadgetBiz is a portal that allows the seller to advertise their
              products on the internet. It can be conducted on any device like
              computers, smartphones, tablets, or any other smart devices.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Account;

const accountStyle = StyleSheet.create({
  accountContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  authenticationContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  loginBtn: {
    backgroundColor: "#fff",
    width: "50%",
    borderRadius: 8,
  },
  loginTxt: {
    fontSize: 18,
  },

  aboutUsText: {
    color: "#FFF",
    textAlign: "center",
  },
  userSection: {
    justifyContent: "space-between",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 5,
    height: "45%",
  },
  userDescContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    marginRight: 20,
    height: 100,
    width: 100,
  },

  midSection: {
    padding: 20,
    marginVertical: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },
  midCategory: {
    justifyContent: "center",
    alignItems: "center",
  },
  midCategoryIcons: {
    color: "#808080",
    marginVertical: 5,
  },
  textItems: {
    color: "#808080",
    marginVertical: 5,
  },

  textItems1: {
    marginVertical: 5,
    color: "#14A44D",
  },
  textItemHead: {
    fontWeight: 700,
    fontSize: 18,
  },
  bottomSection: {
    marginVertical: 20,
    alignItems: "center",
  },
  accountBtn: {
    backgroundColor: "#FF6347",
    marginVertical: 10,
    width: "80%",
    borderRadius: 8,
  },
  accountBtnTxt: {
    color: "#FFF",
  },
});
