// React
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

// Constants, Hooks, Interfaces
import { ROUTES } from "../../constants/routes";
import { useAuthUserValue } from "../../context/user";

interface PrivateRouteProps extends RouteProps {}

// 로그인이 안되어있으면 landing 으로 이동
export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const authUser = useAuthUserValue();
  if (authUser === null) {
    const renderComponent = () => (
      <Redirect to={{ pathname: ROUTES.LANDING }} />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else {
    return <Route {...props} />;
  }
};

// 로그인이 되어있으면 /home 으로 이동
export const PublicRoute: React.FC<PrivateRouteProps> = props => {
  const authUser = useAuthUserValue();
  if (authUser === null) {
    return <Route {...props} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: ROUTES.HOME }} />;
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
};
