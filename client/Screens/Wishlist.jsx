import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect } from "react";
import Right from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { getMyWishlist, removeFromWishlist } from "../features/wishlistSlice";
import Login from "./Login";
import Loader from "../Components/Loader";
const Wishlist = () => {
  const { wishlists, loading, error } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMyWishlist(user._id));
    }

    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={wishlistStyle.wishlistContainer}>
          {!isAuthenticated ? (
            <Login />
          ) : (
            <>
              <Text style={wishlistStyle.wishlistHeader}>My Wishlist</Text>
              {wishlists?.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      padding: 10,
                      fontWeight: "600",
                      textAlign: "center",
                      color: "#A8A8A8",
                    }}
                  >
                    Nothing in Wishlist
                  </Text>
                </View>
              ) : (
                <>
                  <ScrollView style={wishlistStyle.wishlistItemContainer}>
                    {wishlists &&
                      wishlists.map((item, index) => (
                        <View key={index} style={wishlistStyle.wishlistItem}>
                          <Image
                            source={{
                              uri: item.product.image
                                ? item.product.image
                                : null,
                            }}
                            style={wishlistStyle.cartImage}
                          />

                          <View>
                            <Text style={{ marginVertical: 2.5 }}>
                              {item.product.name}
                            </Text>
                            <Text style={{ marginVertical: 2.5 }}>
                              Rs. {item.product.price}
                            </Text>

                            <View style={wishlistStyle.wishlistActions}>
                              <Text
                                onPress={async () => {
                                  ToastAndroid.show(
                                    "Removed from Wishlist",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                  );
                                  dispatch(
                                    removeFromWishlist(item.product.product_id)
                                  );
                                  await dispatch(getMyWishlist(user._id));
                                }}
                                style={wishlistStyle.outOfStock}
                              >
                                Remove
                              </Text>
                              <Text> | </Text>
                              <Text
                                style={
                                  item.product.stock === 0
                                    ? wishlistStyle.outOfStock
                                    : wishlistStyle.inStock
                                }
                              >
                                {item.product.stock === 0
                                  ? "Out Of Stock"
                                  : "In Stock"}
                              </Text>
                            </View>
                          </View>

                          <Right
                            name="chevron-right"
                            size={30}
                            color={"#0009"}
                          />
                        </View>
                      ))}
                  </ScrollView>
                </>
              )}
            </>
          )}
        </View>
      )}
    </>
  );
};

export default Wishlist;

const wishlistStyle = StyleSheet.create({
  wishlistContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  wishlistHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "#FFF",
  },

  wishlistItemContainer: {
    padding: 20,
  },
  wishlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0.5,
    padding: 20,
    alignItems: "center",
    marginVertical: 5,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderWidth: 1,
  },

  wishlistActions: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },
  outOfStock: {
    color: "#DC4C64",
    marginRight: 5,
  },
  inStock: {
    color: "#14A44D",
    marginHorizontal: 5,
  },
});
