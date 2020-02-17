// React
import { createMuiTheme } from "@material-ui/core";

/// Create Material UI Custom Theme
export const customTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#488CFF",
      main: "#266CC2",
      dark: "#002E74"
    },
    secondary: {
      light: "#2DB784",
      main: "#3A8A41",
      dark: "#397D40"
    },
    text: {
      primary: "#333333",
      secondary: "#ffffff"
    }
  }
});
