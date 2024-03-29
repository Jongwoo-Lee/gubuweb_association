// React
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuthUserValue, useAssociationValue } from "../../context/user";
import { Grid, Hidden } from "@material-ui/core";
import { Menubar } from "../layout/Menubar";

interface PrivateRouteProps extends RouteProps {}

// 로그인이 안되어있으면 landing 으로 이동
export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const authUser = useAuthUserValue();
  const ascData = useAssociationValue();

  if (authUser === null) {
    const renderComponent = () => (
      <Redirect to={{ pathname: ROUTES.LANDING }} />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  } else if (
    props.path === ROUTES.HOME ||
    props.path === ROUTES.ACCOUNT ||
    (ascData && ascData.isVerified)
  ) {
    return <AddMenubar route={<Route {...props} />} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: ROUTES.HOME }} />;
    return (
      <AddMenubar
        route={
          <Route {...props} component={renderComponent} render={undefined} />
        }
      />
    );
  }
};

// 로그인이 되어있으면 /home 으로 이동
export const PublicRoute: React.FC<PrivateRouteProps> = props => {
  const authUser = useAuthUserValue();
  if (authUser === null) {
    return <Route {...props} />;
  } else {
    const renderComponent = () => <Redirect to={{ pathname: ROUTES.HOME }} />;
    return (
      <AddMenubar
        route={
          <Route {...props} component={renderComponent} render={undefined} />
        }
      />
    );
  }
};

const AddMenubar: React.FC<{ route: JSX.Element }> = ({ route }) => {
  return (
    <Grid container>
      <Hidden xsDown>
        <Grid item sm={2}>
          <Menubar />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={10}>
        {route}
      </Grid>
    </Grid>
  );
};
