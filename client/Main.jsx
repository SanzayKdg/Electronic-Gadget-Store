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
import Shipping from "./Screens/Shipping";
import ConfirmOrder from "./Screens/ConfirmOrder";
import PaymentDetails from "./Screens/PaymentDetails";
import UpdateProfile from "./Screens/UpdateProfile";
import ChangePassword from "./Screens/ChangePassword";
import Messages from "./Screens/Messages";
import MyOrders from "./Screens/MyOrders";
import Wishlist from "./Screens/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import CameraComponent from "./Screens/CameraComponent";
import Verify from "./Screens/Verify";
import { getProfileAsync } from "./features/userSlice";

const Main = ({ navigation }) => {
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileAsync());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* ----------- HOME  ----------- */}

        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />

        {/* ----------- AUTHENTICATION  ----------- */}

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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camera"
          component={CameraComponent}
        />
        {/* ----------- PROFILE  ----------- */}

        <Stack.Screen
          name="Account"
          options={{ headerShown: false }}
          component={Account}
        />
        <Stack.Screen
          name="UpdateProfile"
          options={{ headerShown: false }}
          component={UpdateProfile}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ headerShown: false }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="Messages"
          options={{ headerShown: false }}
          component={Messages}
        />
        <Stack.Screen
          name="Verify"
          options={{ headerShown: false }}
          component={Verify}
        />

        {/* ----------- PRODUCT  ----------- */}

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

        {/* ----------- ORDER / CART / WISHLIST   ----------- */}
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={Cart}
        />

        <Stack.Screen
          name="MyOrders"
          options={{ headerShown: false }}
          component={MyOrders}
        />

        <Stack.Screen
          name="Wishlist"
          options={{ headerShown: false }}
          component={Wishlist}
        />

        {/* ----------- PAYMENT  ----------- */}

        <Stack.Screen
          name="Shipping"
          options={{ headerShown: false }}
          component={Shipping}
        />
        <Stack.Screen
          name="ConfirmOrder"
          options={{ headerShown: false }}
          component={ConfirmOrder}
        />
        <Stack.Screen
          name="PaymentDetails"
          options={{ headerShown: false }}
          component={PaymentDetails}
        />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};
export default Main;
