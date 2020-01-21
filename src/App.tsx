import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Firebase from "./functions/Firebase";

// Context
import AuthContextProvider from "./context/User/auth";

// Constants, Hooks, Interfaces
import * as ROUTES from "./constants/routes";

// Components
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";

Firebase.init();

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navbar />
        <Router>
          <Route exact path={ROUTES.LANDING} component={Login} />
        </Router>
      </AuthContextProvider>
    </div>
  );
};

export default App;
