import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const Messages = () => {
  return (
    <View style={messageStyle.messageContainer}>
      <Text style={messageStyle.messageHeader}>Messages</Text>
      <ScrollView style={messageStyle.allMessages}>
        <View style={messageStyle.messageItems}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              size={50}
              // source={{ uri: avatar ? avatar : null }}
              style={{ backgroundColor: "#AAA8" }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontWeight: "700" }}>User Name</Text>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
              architecto adipisci veritatis consectetur iure. Iste consequatur
              blanditiis distinctio, repudiandae nihil quod similique deserunt
              dolorem. Labore a fuga doloremque nihil possimus. Vel, cum.
            </Text>
          </View>
        </View>
        <View style={messageStyle.messageItems}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              size={50}
              // source={{ uri: avatar ? avatar : null }}
              style={{ backgroundColor: "#AAA8" }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontWeight: "700" }}>User Name</Text>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
              architecto adipisci veritatis consectetur iure. Iste consequatur
              blanditiis distinctio, repudiandae nihil quod similique deserunt
              dolorem. Labore a fuga doloremque nihil possimus. Vel, cum.
            </Text>
          </View>
        </View>
        <View style={messageStyle.messageItems}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              size={50}
              // source={{ uri: avatar ? avatar : null }}
              style={{ backgroundColor: "#AAA8" }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontWeight: "700" }}>User Name</Text>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
              architecto adipisci veritatis consectetur iure. Iste consequatur
              blanditiis distinctio, repudiandae nihil quod similique deserunt
              dolorem. Labore a fuga doloremque nihil possimus. Vel, cum.
            </Text>
          </View>
        </View>
        <View style={messageStyle.messageItems}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar.Image
              size={50}
              // source={{ uri: avatar ? avatar : null }}
              style={{ backgroundColor: "#AAA8" }}
            />

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontWeight: "700" }}>User Name</Text>
            </View>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
              architecto adipisci veritatis consectetur iure. Iste consequatur
              blanditiis distinctio, repudiandae nihil quod similique deserunt
              dolorem. Labore a fuga doloremque nihil possimus. Vel, cum.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Messages;

const messageStyle = StyleSheet.create({
  messageContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  messageHeader: {
    fontSize: 20,
    padding: 10,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#FF6347",
    color: "#FFF",
  },
  allMessages: {
    paddingHorizontal: 20,
  },

  messageItems: {
    margin: 10,
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 20,
  },
});
