import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { useAuthUserValue, useAssociationValue } from "../../context/user";
import Firebase from "../../helpers/Firebase";
import { useLocation, useHistory } from "react-router-dom";

export interface MenubarProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menubar: {
      width: "100%"
    },
    toolbar: theme.mixins.toolbar
  })
);

export const Menubar: React.SFC<MenubarProps> = () => {
  const classes = useStyles();
  const authUser = useAuthUserValue();
  const ascData = useAssociationValue();
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    Firebase.fireLogout();
  };

  const handleMenuClick = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    if (checkRoute() === text) {
    } else if (text === ROUTENAMES.HOME) {
      history.push(ROUTES.HOME);
    } else if (text === ROUTENAMES.ACCOUNT) {
      history.push(ROUTES.ACCOUNT);
    } else if (ascData && ascData.isVerified) {
      switch (text) {
        case ROUTENAMES.HOME:
          history.push(ROUTES.HOME);
          break;
        case ROUTENAMES.CONTEST:
          history.push(ROUTES.CONTEST);
          break;
        case ROUTENAMES.ROSTER:
          history.push(ROUTES.ROSTER);
          break;
        case ROUTENAMES.ACCOUNT:
          history.push(ROUTES.ACCOUNT);
          break;
        default:
          break;
      }
    }
  };

  const UserMenu: React.SFC = () => {
    return (
      <List>
        <MenubarItem text={ROUTENAMES.HOME} key={ROUTENAMES.HOME} />
        <MenubarItem text={ROUTENAMES.CONTEST} key={ROUTENAMES.CONTEST} />
        <MenubarItem text={ROUTENAMES.ROSTER} key={ROUTENAMES.ROSTER} />
        <MenubarItem text={ROUTENAMES.ACCOUNT} key={ROUTENAMES.ACCOUNT} />
      </List>
    );
  };

  const HideMenu: React.SFC = () => {
    return (
      <List>
        <MenubarItem text={ROUTENAMES.HOME} key={ROUTENAMES.HOME} />
        <MenubarItem text={ROUTENAMES.ACCOUNT} key={ROUTENAMES.ACCOUNT} />
      </List>
    );
  };

  const LogoutMenu: React.SFC = () => {
    return (
      <List>
        <ListItem button key="logout" onClick={handleLogout}>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </List>
    );
  };

  const checkRoute = () => {
    switch (pathname) {
      case ROUTES.HOME:
        return ROUTENAMES.HOME;
      case ROUTES.CONTEST:
        return ROUTENAMES.CONTEST;
      case ROUTES.ROSTER:
        return ROUTENAMES.ROSTER;
      case ROUTES.ACCOUNT:
        return ROUTENAMES.ACCOUNT;
      default:
        return undefined;
    }
  };

  const MenubarItem: React.SFC<{ text: string }> = ({ text }) => {
    return (
      <ListItem button onClick={e => handleMenuClick(e, text)} key={text}>
        <ListItemText
          disableTypography
          primary={
            checkRoute() === text ? (
              <Typography style={{ fontWeight: "bold" }}>{text}</Typography>
            ) : (
              <Typography>{text}</Typography>
            )
          }
        />
      </ListItem>
    );
  };

  return (
    authUser && (
      <Drawer variant="permanent" className={classes.menubar}>
        <div className={classes.toolbar} />
        {ascData && ascData.isVerified ? <UserMenu /> : <HideMenu />}
        <Divider />
        <LogoutMenu />
      </Drawer>
    )
  );
};
