import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { USER_LOGIN } from '../../API/constant';
import { UserSliceActions } from '../../Redux/Slices/UserSlice';

const { getInitialMe } = UserSliceActions;
function PrivateRoute({ component: Component, ...rest }) {
  const checkToken = () => {
    return JSON.parse(localStorage.getItem('token'));
  };
  const dispatch = useDispatch();

  // Tự động cập nhật lại userInfo khi người dùng tắt thiết bị
  useEffect(() => {
    if (checkToken) {
      let user = {};
      if (localStorage.getItem(USER_LOGIN)) {
        user = JSON.parse(localStorage.getItem(USER_LOGIN));
      }
      dispatch(getInitialMe(user));
    }
  }, []);

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
