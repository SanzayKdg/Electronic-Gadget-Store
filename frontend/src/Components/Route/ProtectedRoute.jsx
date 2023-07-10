import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, Component }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.admin
  );

  return (
    <Fragment>
      {loading === false &&
        // <Route
        //   {...rest}
        //   render={(props) => {
        //     if (isLogin === false) {
        //       return <Navigate to="/" />;
        //     }
        //     if (isAdmin === true && user.role !== "admin") {
        //       return <Navigate to="/" />;
        //     }
        //     return <Component {...props} />;
        //   }}
        // />
        (isAuthenticated && isAdmin === true && user.role === "admin" ? (
          <Component />
        ) : (
          <Navigate to="/" />
        ))}
    </Fragment>
  );
};

export default ProtectedRoute;
