import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import React from "react";
import { Rating } from "react-native-elements";
import { Card } from "react-native-paper";

const CardCarousel = ({ reviews }) => {
  const renderIndicator = () => {
    return reviews.map((dot, index) => (
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
    ));
  };

  if (reviews && reviews.length) {
    return (
      <View style={ratingStyle.scrollContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <View style={ratingStyle.reviewContainer}>
            {reviews &&
              reviews.map((item, index) => (
                <Card
                  onPress={() =>
                    navigation.navigate("Product", { id: item._id })
                  }
                  key={index}
                  style={ratingStyle.cardView}
                >
                  <View style={ratingStyle.ratingTop}>
                    <Image
                      style={ratingStyle.userImage}
                      source={{ uri: item.image }}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={ratingStyle.userName}>{item.name}</Text>

                      <Rating
                        startingValue={item.rating}
                        ratingCount={5}
                        imageSize={15}
                        style={ratingStyle.productRating}
                        readonly
                      />
                    </View>
                  </View>
                  <Text style={ratingStyle.reviewComment}>{item.comment}</Text>
                </Card>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  return null;
};

export default CardCarousel;

const ratingStyle = StyleSheet.create({
  scrollContainer: {
    marginVertical: 20,
    height: 180
  },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardView: {
    marginHorizontal: 5,
    padding: 20,
    backgroundColor: "#fff",
    height: 150,
  },
  ratingTop: {
    flexDirection: "row",
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 360,
  },
  userName: {
    width: 100,
  },
  productRating: {
    alignItems: "flex-start",
    marginTop: 5,
  },

  reviewComment: {
    marginTop: 10,
  },
});
