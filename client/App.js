import { Provider } from "react-redux";
import store from "./Redux/Store";
import Main from "./Main";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// const persistor = persistStore(store);
export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Main />
      {/* </PersistGate> */}
    </Provider>
  );
}
