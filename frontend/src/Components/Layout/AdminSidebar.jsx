import React, { useEffect } from "react";
import "./AdminSidebar.css";
import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logoutAsync } from "../../Redux/Slices/Auth/authSlice";
const AdminSidebar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);
  // const { error, isAuthenticated } = useSelector((state) => state.logout);
  useEffect(() => {
    if (error) {
      alert.error(error);
      // dispatch(clearErrors());
    }
    // if (isAuthenticated === false) {
    if (success === false) {
      // dispatch(clearMessage());
      alert.success("Logged Out Successfully");
      navigate("/");
    }
  }, [error, alert, success, navigate]);

  const logoutHandler = () => {
    // dispatch(logoutAsync());
    dispatch(logout());
  };
  return (
    <div className="adminSidebar">
      <div className="logo">
        <Image src="/logo1.png" alt="GadgetsBiz Logo" />
      </div>

      <Link to={"/dashboard"} className="sidebar__item">
        <p>
          <DashboardIcon className="muiIcons" />
          Dashboard
        </p>
      </Link>

      <div className="sidebar__item">
        <Menu className="productsMenu">
          <MenuButton className="productsButton" as={Button}>
            <p className="productsSide">
              <ChevronDownIcon margin={2} /> Products
            </p>
          </MenuButton>
          <MenuList className="menuList">
            <MenuItem className="menuItem menuItem1">
              <Link to={"/admin/product/add"} className="sidebar__items">
                <p>
                  <AddIcon /> Add Product
                </p>
              </Link>
            </MenuItem>
            <MenuItem className="menuItem">
              <Link to={"/admin/products"} className="sidebar__items">
                <p>
                  <PostAddIcon /> All Products
                </p>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <Link to={"/admin/orders"} className="sidebar__item">
        <p>
          <ListAltIcon className="muiIcons" />
          Orders
        </p>
      </Link>

      <Link to={"/admin/users"} className="sidebar__item">
        <p>
          <PeopleIcon className="muiIcons" />
          Users
        </p>
      </Link>

      <Link to={"/admin/products/reviews"} className="sidebar__item">
        <p>
          <RateReviewIcon className="muiIcons" />
          Reviews
        </p>
      </Link>
      <Link to={"/"} onClick={logoutHandler} className="sidebar__item">
        <p>
          <ExitToAppIcon className="muiIcons" />
          Logout
        </p>
      </Link>
    </div>
  );
};

export default AdminSidebar;
