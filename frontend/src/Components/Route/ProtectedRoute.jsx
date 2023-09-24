import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(
    isAuthenticated || JSON.parse(localStorage.getItem("isAuthenticated"))
  );

  const [admin, setAdmin] = useState(
    user?.role || JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (isAuth) {
      setAuthenticated(JSON.parse(isAuth));
      setAdmin(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  if (!authenticated) {
    return <Navigate to={"/"} />;
  }

  if (admin !== "admin") {
    return <Navigate to={"/unauthorized"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
