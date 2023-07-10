import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Footer from "./Components/Footer";
import Account from "./Screens/Account";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Products from "./Screens/Products";
import Cart from "./Screens/Cart";
import ProductDetail from "./Screens/ProductDetail";


const Main = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Products"
          options={{ headerShown: false }}
          component={Products}
        />
        <Stack.Screen
          name="Product"
          options={{ headerShown: false }}
          component={ProductDetail}
        />
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={Cart}
        />

        <Stack.Screen
          name="Account"
          options={{ headerShown: false }}
          component={Account}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerShown: false }}
          component={Register}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};
export default Main;
