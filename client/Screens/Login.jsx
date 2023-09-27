import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../features/authSlice";

const Login = ({ navigation }) => {
  const { isAuthenticated, error, user } = useSelector((state) => state.auth);

  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //validation functions
  const emailValidation = () => {
    if (email === "") {
      setEmailErrors("Email is required");
    } else {
      setEmailErrors("");
    }
  };
  const passwordValidation = () => {
    if (password === "") {
      setPasswordErrors("Password is required");
    } else {
      setPasswordErrors("");
    }
  };

  // Login Handler
  const loginHandler = () => {
    dispatch(loginAsync({ email, password }));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigation.navigate("Account");
    }
  }, [error, dispatch, navigation, email, isAuthenticated]);

  return (
    <ScrollView style={loginStyle.scrollViewContainer}>
      <Text style={loginStyle.loginHeader}>LOGIN</Text>
      <View style={loginStyle.loginContainer}>
        <View style={{ width: "70%" }}>
          <TextInput
            style={loginStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            inputMode="email"
            onBlur={emailValidation}
          />
          {emailErrors && (
            <Text style={{ color: "#DC4C64", marginBottom: 5 }}>
              {emailErrors}
            </Text>
          )}
          <TextInput
            secureTextEntry
            style={loginStyle.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            inputMode="text"
            onBlur={passwordValidation}
          />
          {passwordErrors && (
            <Text style={{ color: "#DC4C64", marginBottom: 5 }}>
              {passwordErrors}
            </Text>
          )}
        </View>
        <Button style={loginStyle.btn} onPress={loginHandler}>
          <Text style={{ color: "#fff" }}>Login</Text>
        </Button>
        <Text style={{ marginTop: 20 }}>Or</Text>

        <Text style={{ marginTop: 20 }}>Don't Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={loginStyle.signUp}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          {/* <Text style={loginStyle.forgot}>Forgot Password?</Text> */}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const loginStyle = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  loginHeader: {
    marginTop: 150,
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 20,
  },
  loginContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    marginVertical: 10,
  },
  signUp: {
    color: "#FF6347",
    height: 30,
    margin: 10,
  },
  forgot: {
    color: "blue",
    height: 30,
    textDecorationLine: "underline",
  },
});
