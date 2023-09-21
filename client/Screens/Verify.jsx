import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { getProfileAsync, verifyAsync } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Components/Loader";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const { user, message, error, success } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const verifyHandler = () => {
    if (otp === "") {
      ToastAndroid.show(
        "Please enter OTP",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      console.log("enter otp");
    } else if (otp !== user.otp) {
      ToastAndroid.show(
        "Invalid OTP or has been expired",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      console.log("invalid otp");
    }
    dispatch(verifyAsync(otp));
    setVerified(true);
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (success && verified === true) {
      alert(message);
      ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Account");
      dispatch(getProfileAsync());
    }
  }, [error, success, verified, message, otp]);

  return (
    <View style={verifyStyle.verifyContainer}>
      <Text style={verifyStyle.verifyHeader}>Verify Your Account</Text>
      <View style={{ width: "70%" }}>
        <TextInput
          style={verifyStyle.input}
          placeholder="Enter OTP"
          inputMode="decimal"
          value={otp}
          maxLength={6}
          onChangeText={setOtp}
        />
      </View>
      <Button style={verifyStyle.btn} onPress={verifyHandler}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Submit</Text>
      </Button>
    </View>
  );
};

export default Verify;

const verifyStyle = StyleSheet.create({
  verifyContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    color: "#808080",
    marginBottom: 20,
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
  },
  btn: {
    backgroundColor: "#FF6347",
    padding: 5,
    width: "70%",
    borderRadius: 0,
  },
});
