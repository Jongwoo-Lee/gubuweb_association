// React
import React, { Component } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

// Constants, Hooks, Interfaces
import { ROUTES } from "../../constants/routes";
import { FirebaseAuth } from "../../helpers/Firebase";

// Components, Classes

//Material UI

export const PrivateRoute = ({
  authUser,
  ...rest
}: RouteProps & { authUser: FirebaseAuth }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: ROUTES.LANDING, state: { from: props.location } }}
          />
        )
      }
    />
  );
};
