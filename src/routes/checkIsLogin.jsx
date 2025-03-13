import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';

const CheckLogin = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ?
        <Redirect to="/dashboard" />
        : <Redirect to="/login" />
    )} />
  );
};

export default CheckLogin;