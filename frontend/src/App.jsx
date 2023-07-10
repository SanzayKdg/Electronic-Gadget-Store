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
import ProtectedRoute from "./Components/Route/ProtectedRoute";
import UpdateProduct from "./Components/Admin/Products/UpdateProduct.jsx";
import UpdateOrder from "./Components/Admin/Orders/UpdateOrder";
import UpdateUsers from "./Components/Admin/Users/UpdateUsers";
function App() {
  const { user, isAuthenticated } = useSelector((state) => state.admin);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* {isLogin && <Route exact path="/dashboard" Component={Dashboard} />} */}
        <Route
          exact
          path="/dashboard"
          element={<ProtectedRoute isAdmin={true} Component={Dashboard} />}
        />
        <Route
          exact
          path="/admin/product/add"
          element={<ProtectedRoute isAdmin={true} Component={AddProducts} />}
        />
        <Route
          exact
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} Component={AllProducts} />}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateProduct} />}
        />
        <Route
          exact
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} Component={Orders} />}
        />
        <Route
          exact
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} Component={Users} />}
        />
        <Route
          exact
          path="/admin/products/reviews"
          element={<ProtectedRoute isAdmin={true} Component={Reviews} />}
        />
        <Route
          exact
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateOrder} />}
        />
        <Route
          exact
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} Component={UpdateUsers} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
