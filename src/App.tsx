import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

// Context
import { AuthContextProvider } from "./context/user";

// Constants, Hooks, Interfaces
import * as ROUTES from "./constants/routes";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { MuiThemeProvider } from "@material-ui/core";
import { customTheme } from "./context/theme";

export const App: React.FC = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={customTheme}>
        <AuthContextProvider>
          <Navbar />
          <Router>
            <Route exact path={ROUTES.LANDING} component={Login} />
          </Router>
          <Router>
            <Route exact path={ROUTES.REGISTER} component={Register} />
          </Router>
        </AuthContextProvider>
      </MuiThemeProvider>
    </div>
  );
};
