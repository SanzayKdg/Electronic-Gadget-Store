import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import React from "react";
const screenWidth = Dimensions.get("window").width;
const height = screenWidth * 0.5;
// Simple Carousel
const Carousel = ({ images }) => {
  // dot indicators
  const renderIndicator = () => {
    return images.map((dot, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: "#AAA",
            height: 8,
            width: 8,
            borderRadius: 5,
            marginHorizontal: 2,
          }}
        ></View>
      );
    });
  };
  if (images && images.length) {
    return (
      <View style={homeStyle.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              style={homeStyle.carouselImage}
              source={image.source}
            />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 5,
          }}
        >
          {renderIndicator()}
        </View>
      </View>
    );
  }
  return null;
};

export default Carousel;

const homeStyle = StyleSheet.create({
  scrollContainer: {
    height,
  },
  carouselImage: {
    width: screenWidth,
    height,
  },
});
