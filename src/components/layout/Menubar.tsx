import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { MENU } from "../../constants/routes";
import { useAuthUserValue } from "../../context/user";
import Firebase from "../../helpers/Firebase";

export interface MenubarProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menubar: {
      width: 240,
      flexShrink: 0
    },
    toolbar: theme.mixins.toolbar
  })
);

export const Menubar: React.SFC<MenubarProps> = () => {
  const classes = useStyles();
  const authUser = useAuthUserValue();

  return (
    authUser && (
      <Drawer variant="permanent" className={classes.menubar}>
        <div className={classes.toolbar} />
        <List>
          {MENU.map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <LogoutMenu />
      </Drawer>
    )
  );
};

const LogoutMenu: React.SFC = () => {
  const handleLogout = () => {
    Firebase.fireLogout();
  };

  return (
    <List>
      <ListItem button key="logout" onClick={handleLogout}>
        <ListItemText primary="로그아웃" />
      </ListItem>
    </List>
  );
};
