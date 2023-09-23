import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Admin/Login/Login";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import AddProducts from "./Components/Admin/Products/AddProducts";
import AllProducts from "./Components/Admin/Products/AllProducts";
import Orders from "./Components/Admin/Orders/Orders";
import Users from "./Components/Admin/Users/Users";
import Reviews from "./Components/Admin/Reviews/Reviews";
import { useSelector } from "react-redux";
// import ProtectedRoute from "./Components/Route/ProtectedRoute";
import UpdateProduct from "./Components/Admin/Products/UpdateProduct.jsx";
import UpdateOrder from "./Components/Admin/Orders/UpdateOrder";
import UpdateUsers from "./Components/Admin/Users/UpdateUsers";
import { useEffect, useState } from "react";
import OrderDetail from "./Components/Admin/Orders/OrderDetail";
function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth) {
      setAuthenticated(JSON.parse(isAuth));
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* ----------- AUTHENTICATION ----------- */}

        <Route exact path="/" element={<Login />} />

        {/* ----------- DASHBOARD ----------- */}

        {authenticated && (
          <Route exact path="/dashboard" Component={Dashboard} />
        )}

        {/* ----------- PRODUCTS ----------- */}

        {authenticated && (
          <Route exact path="/admin/product/add" Component={AddProducts} />
        )}
        {authenticated && (
          <Route exact path="/admin/products" Component={AllProducts} />
        )}
        {authenticated && (
          <Route exact path="/admin/product/:id" Component={UpdateProduct} />
        )}
        {authenticated && (
          <Route exact path="/admin/products/reviews" Component={Reviews} />
        )}

        {/* ----------- USERS ----------- */}

        {authenticated && <Route exact path="/admin/users" Component={Users} />}
        {authenticated && (
          <Route exact path="/admin/user/:id" Component={UpdateUsers} />
        )}

        {/* ----------- ORDER ----------- */}

        {authenticated && (
          <Route exact path="/admin/orders" Component={Orders} />
        )}
        {authenticated && (
          <Route exact path="/admin/order/:id" Component={UpdateOrder} />
        )}
        {authenticated && (
          <Route exact path="/order/detail/:id" Component={OrderDetail} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
