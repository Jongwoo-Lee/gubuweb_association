import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

// Context
import { AuthContextProvider } from "./context/user";

// Constants, Hooks, Interfaces
import { ROUTES } from "./constants/routes";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/Home";
import { MuiThemeProvider } from "@material-ui/core";
import { customTheme } from "./context/theme";
// import { AuthRoute } from "./components/common/AuthRoute";
import { PublicRoute, PrivateRoute } from "./components/common/PrivateRoute";

export const App: React.FC = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={customTheme}>
        <AuthContextProvider>
          <Navbar />
          <Router>
            <PublicRoute exact path={ROUTES.LANDING} component={Login} />
            <PublicRoute exact path={ROUTES.REGISTER} component={Register} />
            <PrivateRoute exact path={ROUTES.HOME} component={Home} />
          </Router>
        </AuthContextProvider>
      </MuiThemeProvider>
    </div>
  );
};
