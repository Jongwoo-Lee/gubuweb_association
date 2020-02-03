import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

// Context
import { AuthContextProvider, useAuthUserValue } from "./context/user";

// Constants, Hooks, Interfaces
import { ROUTES } from "./constants/routes";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { MuiThemeProvider } from "@material-ui/core";
import { customTheme } from "./context/theme";
import { FirebaseAuth } from "./helpers/Firebase";
import { AuthRoute } from "./components/common/AuthRoute";
import { PrivateRoute } from "./components/common/PrivateRoute";

export const App: React.FC = () => {
  const authUser: FirebaseAuth = useAuthUserValue();

  return (
    <div className="App">
      <MuiThemeProvider theme={customTheme}>
        <AuthContextProvider>
          <Navbar />
          <Router>
            <AuthRoute
              exact
              path={ROUTES.LANDING}
              authUser={authUser}
              component={Login}
            />
            <AuthRoute
              exact
              path={ROUTES.REGISTER}
              authUser={authUser}
              component={Register}
            />
            <PrivateRoute
              exact
              path={ROUTES.HOME}
              authUser={authUser}
              component={Register}
            />
          </Router>
        </AuthContextProvider>
      </MuiThemeProvider>
    </div>
  );
};
