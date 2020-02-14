// React
import React from "react";

// Components, Classes
import logoText from "../../images/logo_text.png";

//Material UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Toolbar,
  AppBar,
  Grid,
  Typography,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useAssociationValue } from "../../context/user";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: "white",

      width: "100vw",

      paddingLeft: "8vw",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: "4vw"
      },
      paddingRight: "8vw",
      [theme.breakpoints.down("sm")]: {
        paddingRight: "4vw"
      }
    },
    asc: {
      display: "flex",
      flexShrink: 0
    }
  })
);

export const Navbar = () => {
  const classes = useStyles();
  const ascData = useAssociationValue();
  return (
    <div>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item>
              <a href="/">
                <img src={logoText} width="100" alt="GUBU" />
              </a>
            </Grid>
            <Grid item>
              <Typography color="textPrimary">
                대회 / 협회 관리 페이지
              </Typography>
            </Grid>
          </Grid>
          {ascData && (
            <div className={classes.asc}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={ascData.email ?? undefined}
                aria-haspopup="true"
                color="primary"
                style={{ margin: "0 0" }}
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Typography style={{ margin: "auto auto" }} color="textPrimary">
                {ascData.name}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
