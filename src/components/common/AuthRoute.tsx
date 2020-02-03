// React
import React, { Component } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

// Constants, Hooks, Interfaces
import { ROUTES } from "../../constants/routes";
import { FirebaseAuth } from "../../helpers/Firebase";

// Components, Classes

//Material UI

// 로그인이 되어있으면 /home 으로 이동
export const AuthRoute = ({
  authUser,
  ...rest
}: RouteProps & { authUser: FirebaseAuth }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Redirect
            to={{ pathname: ROUTES.HOME, state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
