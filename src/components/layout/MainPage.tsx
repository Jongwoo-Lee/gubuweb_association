import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "../common/PrivateRoute";
import { ROUTES } from "../../constants/routes";

// Components
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Home } from "../Home";
import { Cup } from "../cup/Cup";
import { Account } from "../auth/Account";
import { Roster } from "../roster/Roster";
import { Grid, Hidden } from "@material-ui/core";
import { Menubar } from "./Menubar";

export interface MainPageProps {}

export const MainPage: React.SFC<MainPageProps> = () => {
  return (
    <Router>
      {/* <Grid container>
        <Hidden xsDown>
          <Grid item sm={2} md={3}>
            <Menubar />
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={10} md={9} style={{ margin: "30px auto" }}> */}
      <PublicRoute exact path={ROUTES.LANDING} component={Login} />
      <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
      <PrivateRoute exact path={ROUTES.HOME} component={Home} />
      <PrivateRoute path={ROUTES.CUP} component={Cup} />
      <PrivateRoute path={ROUTES.ROSTER} component={Roster} />
      <PrivateRoute exact path={ROUTES.ACCOUNT} component={Account} />
      {/* </Grid> 
        <Hidden xsDown>
          <Grid item sm={2} md={3}></Grid>
        </Hidden> 
      </Grid>*/}
    </Router>
  );
};
