import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../features/authSlice";
import mime from "mime";
import Loader from "../Components/Loader";
const Register = ({ nav, route }) => {
  const navigation = useNavigation();
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { loading, success, message, error } = useSelector(
    (state) => state.auth
  );
  const handleImage = () => {
    navigation.navigate("Camera", { updateProfile: false });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  const registerHandler = () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("contact", contact);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    dispatch(registerAsync(myForm));
    setFormSent(true);
  };

  useEffect(() => {
    if (success && formSent === true) {
      alert(message);
      navigation.navigate("Verify");
      setFormSent(false);
    }

    if (error) {
      alert(error);
    }
  }, [success, formSent, message, error]);

  return (
    <ScrollView style={registerStyle.registerScroll}>
      <View style={registerStyle.registerContainer}>
        <Avatar.Image
          size={100}
          source={{ uri: avatar ? avatar : null }}
          style={{ backgroundColor: "#FF6347" }}
        />

        <TouchableOpacity onPress={handleImage}>
          <Text style={{ color: "#FF6347", marginTop: 10 }}>Change Photo</Text>
        </TouchableOpacity>

        <View style={{ width: "70%" }}>
          <TextInput
            style={registerStyle.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            inputMode="text"
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            inputMode="email"
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
            inputMode="decimal"
            maxLength={10}
          />
          <TextInput
            style={registerStyle.input}
            placeholder="Password"
            value={password}
            inputMode="text"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <Button
          style={registerStyle.btn}
          onPress={registerHandler}
          disabled={!email || !password || !name}
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
    </ScrollView>
  );
};

export default Register;

const registerStyle = StyleSheet.create({
  registerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  registerScroll: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
