import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./Redux/Store.js";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AlertProvider template={AlertTemplate} {...options}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </AlertProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
