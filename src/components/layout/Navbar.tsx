// React
import React from "react";

// Components, Classes
import logoText from "../../images/logo_text.png";

//Material UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: "white"
    },
    logo: {
      paddingLeft: "8vw",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "4vw"
      }
    }
  })
);

const Navbar = () => {
  const classes = useStyles({});
  return (
    <div>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <a href="/">
                <img
                  src={logoText}
                  width="100"
                  className={classes.logo}
                  alt="GUBU"
                />
              </a>
            </Grid>
            <Grid item>
              <Typography color="textPrimary">
                대회 / 협회 관리 페이지
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
