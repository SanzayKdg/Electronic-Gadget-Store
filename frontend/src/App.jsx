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
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import Unauthorized from "./Components/Layout/Unauthorized";
import NotResolved from "./Components/Layout/NotResolved";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated || JSON.parse(localStorage.getItem("isAuthenticated"))
  );
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

        <Route
          exact
          path="/"
          element={!authenticated ? <Login /> : <Dashboard />}
        />

        <Route element={<ProtectedRoute />}>
          {/* ----------- DASHBOARD ----------- */}
          <Route exact path="/dashboard" element={<Dashboard />} />

          {/* ----------- PRODUCTS ----------- */}

          <Route exact path="/admin/product/add" element={<AddProducts />} />

          <Route exact path="/admin/products" element={<AllProducts />} />

          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />

          <Route exact path="/admin/products/reviews" element={<Reviews />} />

          {/* ----------- USERS ----------- */}

          <Route exact path="/admin/users" element={<Users />} />

          <Route exact path="/admin/user/:id" element={<UpdateUsers />} />

          {/* ----------- ORDER ----------- */}

          <Route exact path="/admin/orders" element={<Orders />} />

          <Route exact path="/admin/order/:id" element={<UpdateOrder />} />

          <Route exact path="/order/detail/:id" element={<OrderDetail />} />
        </Route>

        {/* ----------- UNAUTHORIZED ----------- */}
        <Route exact path="/unauthorized" element={<Unauthorized />} />

        {/* ----------- UNRESOLVED PATH ----------- */}
        <Route path="*" element={<NotResolved />} />
      </Routes>
    </Router>
  );
}

export default App;
