import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { images } from "./imagesLink";
import Header from "../Components/Header";
import { brandCategory } from "./categories";
import Carousel from "./Carousel";

const Home = () => {
  return (
    <View style={homeStyle.homeContainer}>
      <ScrollView>
        <SafeAreaView style={homeStyle.safeView}>
          <Header />

          <View style={homeStyle.carouselcontainer}>
            <Carousel images={images} />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default Home;

const homeStyle = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#AAA1",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  safeView: {
    backgroundColor: "#fff",
  },
  carouselcontainer: {
    flex: 1,
    marginTop: 20,
  },

  categoriesContainer: {
    marginVertical: 5,
    borderWidth: 2,
    padding: 10,
  },

  imageCard: {
    width: "100%",
  },
});
