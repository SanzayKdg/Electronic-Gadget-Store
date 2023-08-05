import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
const ChangePassword = () => {
  return (
    <View style={registerStyle.mainContainer}>
      <Text style={registerStyle.changePasswordHeading}>Change Password</Text>
      <View style={registerStyle.registerContainer}>
        <View style={{ width: "70%" }}>
          <TextInput
            style={registerStyle.input}
            placeholder="Old Password"
            //   value={name}
            //   onChangeText={setName}
          />
          <TextInput
            style={registerStyle.input}
            placeholder="New Password"
            //   value={email}
            //   onChangeText={setEmail}
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Confirm Password"
            //   value={password}
            //   onChangeText={setPassword}
          />
        </View>

        <Button
          style={registerStyle.btn}
          // onPress={registerHandler}
          // disabled={!email || !password || !name}
        >
          <Text style={{ color: "#fff" }}>Change Password</Text>
        </Button>
      </View>
    </View>
  );
};

export default ChangePassword;

const registerStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  registerContainer: {
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
});
