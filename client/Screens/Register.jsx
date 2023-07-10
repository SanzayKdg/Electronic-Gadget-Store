import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [avatar, setAvatar] = useState("");
  return (
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
          placeholder="Contact"
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
        <Text style={{ color: "#fff" }}>Register</Text>
      </Button>

      <View style={{ marginVertical: 20, flexDirection: "row" }}>
        <Text>Already a User?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={registerStyle.login}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const registerStyle = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  registerHeader: {
    fontSize: 20,
    margin: 20,
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
