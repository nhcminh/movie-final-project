import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const checkToken = () => {
    return JSON.parse(localStorage.getItem('token'));
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkToken() !== null ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
}

export default PrivateRoute;
