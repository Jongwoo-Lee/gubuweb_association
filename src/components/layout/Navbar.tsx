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
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useAssociationValue } from "../../context/user";
import Firebase from "../../helpers/Firebase";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    Firebase.fireLogout();
  };

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
              <div>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="appbar-user"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="primary"
                  style={{ margin: "0 0" }}
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  id="appbar-user"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </Menu>
              </div>
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
