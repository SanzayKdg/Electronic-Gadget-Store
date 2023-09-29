import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAsync, getProfileAsync } from "../features/userSlice";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Components/Loader";

const ChangePassword = () => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordErrors, setOldPasswordErrors] = useState("");
  const [newPasswordErrors, setNewPasswordErrors] = useState("");
  const [confirmPasswordErrors, setConfirmPasswordErrors] = useState("");

  const { success, message, error, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Validation
  const oldPasswordValidation = () => {
    if (oldPassword === "") {
      setOldPasswordErrors("Old Password is required");
    } else {
      setOldPasswordErrors("");
    }
  };
  const newPasswordValidation = () => {
    if (newPassword === "") {
      setNewPasswordErrors("New Password is required");
    } else {
      setNewPasswordErrors("");
    }
  };
  const confirmPasswordValidation = () => {
    if (confirmPassword === "") {
      setConfirmPasswordErrors("Confirm Password is required");
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordErrors("Confirm Password didn't matched");
    } else {
      setConfirmPasswordErrors("");
    }
  };

  const changePasswordHandler = async () => {
    const formData = { newPassword, confirmPassword, oldPassword };

    if (newPassword !== confirmPassword) {
      ToastAndroid.show(
        "Confirm password didn't matched",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    dispatch(changePasswordAsync(formData));
    setPasswordChanged(true);
    dispatch(getProfileAsync());
  };

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
    if (success && passwordChanged === true) {
      ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Account");
    }
  }, [dispatch, success, passwordChanged, ToastAndroid, navigation]);

  return (
    <View style={changePasswordStyle.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={changePasswordStyle.changePasswordHeading}>
            Change Password
          </Text>
          <View style={changePasswordStyle.changePasswordContainer}>
            <View style={{ width: "70%" }}>
              <TextInput
                style={changePasswordStyle.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={true}
                onBlur={oldPasswordValidation}
              />
              {oldPasswordErrors && (
                <Text style={changePasswordStyle.errorMsg}>
                  {oldPasswordErrors}
                </Text>
              )}
              <TextInput
                style={changePasswordStyle.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
                onBlur={newPasswordValidation}
              />
              {newPasswordErrors && (
                <Text style={changePasswordStyle.errorMsg}>
                  {newPasswordErrors}
                </Text>
              )}
              <TextInput
                style={changePasswordStyle.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                onBlur={confirmPasswordValidation}
              />
              {confirmPasswordErrors && (
                <Text style={changePasswordStyle.errorMsg}>
                  {confirmPasswordErrors}
                </Text>
              )}
            </View>

            <Button
              style={changePasswordStyle.btn}
              onPress={changePasswordHandler}
            >
              <Text style={{ color: "#fff" }}>Change Password</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ChangePassword;

const changePasswordStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  changePasswordContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  changePasswordHeading: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "#FFF",
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
  login: {
    color: "#FF6347",
  },
  errorMsg: {
    color: "#DC4C64",
    marginBottom: 5,
  },
});
