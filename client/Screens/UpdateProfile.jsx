import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
const UpdateProfile = () => {
  return (
    <View style={registerStyle.mainContainer}>
      <Text style={registerStyle.registerHeader}>Update Profile</Text>
      <View style={registerStyle.registerContainer}>
        <Avatar.Image
          size={100}
          // source={{ uri: avatar ? avatar : null }}
          style={{ backgroundColor: "#FF6347" }}
        />

        <TouchableOpacity
        //    onPress={handleImage}
        >
          <Text style={{ color: "#FF6347", marginTop: 10 }}>Change Photo</Text>
        </TouchableOpacity>

        <View style={{ width: "70%" }}>
          <TextInput
            style={registerStyle.input}
            placeholder="Name"
            //   value={name}
            //   onChangeText={setName}
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Email"
            //   value={email}
            //   onChangeText={setEmail}
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Password"
            //   value={password}
            //   onChangeText={setPassword}
          />
        </View>

        <Button
          style={registerStyle.btn}
          // onPress={registerHandler}
          // disabled={!email || !password || !name}
        >
          <Text style={{ color: "#fff" }}>Update</Text>
        </Button>
      </View>
    </View>
  );
};

export default UpdateProfile;

const registerStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  registerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  registerHeader: {
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
