import React from "react";

// Context
import { AuthContextProvider } from "./context/user";

// Constants, Hooks, Interfaces
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { customTheme } from "./context/theme";
// Components
import { Navbar } from "./components/layout/Navbar";
import { MainPage } from "./components/layout/MainPage";

export const App: React.FC = () => {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CssBaseline />
      <MuiThemeProvider theme={customTheme}>
        <AuthContextProvider>
          <Navbar />
          <MainPage />
        </AuthContextProvider>
      </MuiThemeProvider>
    </div>
  );
};
