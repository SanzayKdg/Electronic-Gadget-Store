import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Components/Loader";
import { getProfileAsync, updateProfileAsync } from "../features/userSlice";
import mime from "mime";
const UpdateProfile = ({ nav, route }) => {
  const [nameErrors, setNameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [contactErrors, setContactErrors] = useState("");

  const nameValidation = () => {
    if (name === "") {
      setNameErrors("Name is required");
    } else {
      setNameErrors("");
    }
  };
  const emailValidation = () => {
    if (email === "") {
      setEmailErrors("Email is required");
    } else {
      setEmailErrors("");
    }
  };
  const contactValidation = () => {
    if (contact === "") {
      setContactErrors("Contact no. is required");
    } else {
      setContactErrors("");
    }
  };
  const { user, loading, success, error, message } = useSelector(
    (state) => state.user
  );
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact.toString());
  const [avatar, setAvatar] = useState(user.avatar.url);
  const navigation = useNavigation();
  const handleImage = () => {
    navigation.navigate("Camera", { updateProfile: true });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);

  const dispatch = useDispatch();
  const updateProfileHandler = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("contact", contact);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });

    if (name === "" || email === "" || contact === "" || avatar === "") {
      ToastAndroid.show(
        "Please fill all required fields",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    dispatch(updateProfileAsync({ myForm }));
    await dispatch(getProfileAsync());
    setFormSent(true);
  };

  useEffect(() => {
    if (success && formSent === true) {
      ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      navigation.navigate("Account");
      setFormSent(false);
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }, [success, formSent, message, error]);

  return (
    <ScrollView style={updateProfileStyle.mainContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={updateProfileStyle.updateProfileHeader}>
            Update Profile
          </Text>
          <View style={updateProfileStyle.updateProfileContainer}>
            <Avatar.Image
              size={100}
              source={{ uri: avatar ? avatar : null }}
              style={{ backgroundColor: "#FF6347" }}
            />

            <TouchableOpacity onPress={handleImage}>
              <Text style={{ color: "#FF6347", marginTop: 10 }}>
                Change Photo
              </Text>
            </TouchableOpacity>

            <View style={{ width: "70%" }}>
              <TextInput
                style={updateProfileStyle.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                onBlur={nameValidation}
              />
              {nameErrors && (
                <Text style={updateProfileStyle.errorMsg}>{nameErrors}</Text>
              )}
              <TextInput
                style={updateProfileStyle.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={emailValidation}
              />
              {emailErrors && (
                <Text style={updateProfileStyle.errorMsg}>{emailErrors}</Text>
              )}
              <TextInput
                style={updateProfileStyle.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
                onBlur={contactValidation}
              />
              {contactErrors && (
                <Text style={updateProfileStyle.errorMsg}>{contactErrors}</Text>
              )}
            </View>

            <Button
              style={updateProfileStyle.btn}
              onPress={updateProfileHandler}
            >
              <Text style={{ color: "#fff" }}>Update</Text>
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default UpdateProfile;

const updateProfileStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  updateProfileContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  updateProfileHeader: {
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
