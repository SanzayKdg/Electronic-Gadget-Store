import { View, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import Search from "react-native-vector-icons/EvilIcons";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";

const Header = () => {
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState("");
  const searchHandler = () => {
    if (keyword.trim()) {
      navigation.navigate("Products", { keyword: keyword });
    } else {
      navigation.navigate("Products");
    }
  };
  return (
    <View style={headerStyle.headerContainer}>
      <View style={headerStyle.headerFormContainer}>
        <Search name="search" size={30} />
        <TextInput
          style={headerStyle.searchInput}
          value={keyword}
          onChangeText={setKeyword}
          placeholder={"Search"}
        />
      </View>
      <Button
        style={headerStyle.searchBtn}
        textColor="#FFF"
        onPress={searchHandler}
      >
        Search
      </Button>
    </View>
  );
};

export default Header;

const headerStyle = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 10,
    marginTop: 5,
  },
  headerFormContainer: {
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 5,
    width: "70%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    width: "50%",
  },
  searchBtn: {
    height: 41,
    width: "25%",
    backgroundColor: "#FF6347",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    textDecorationStyle: "none",
  },
});
