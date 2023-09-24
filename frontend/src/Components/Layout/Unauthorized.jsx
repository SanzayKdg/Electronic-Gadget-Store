import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./NotResolved.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../features/Auth/auth";
const Unauthorized = () => {
  const { error, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (success === true) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [success, navigate, success]);
  const goBackHandler = () => {
    dispatch(logoutAsync());
  };
  return (
    <div>
      <Link to={"/"} onClick={goBackHandler} className="goBack">
        <ArrowBackIcon className="backIcon" />
        <p className="backtxt">Go Back</p>
      </Link>
      <img className="notFound" src="/unauth.jpg" alt="Page Not Found" />
    </div>
  );
};

export default Unauthorized;
