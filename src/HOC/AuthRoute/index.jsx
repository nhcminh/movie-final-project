import React from "react";
import { Redirect, Route } from "react-router-dom";

function AuthRoute({ component: Component, ...rest }) {
  const checkToken = () => {
    return JSON.parse(localStorage.getItem("token"));
  };
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkToken() === null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
}

export default AuthRoute;
