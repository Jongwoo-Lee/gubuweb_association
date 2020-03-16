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

export const Menubar: React.FC<MenubarProps> = () => {
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
        case ROUTENAMES.CUP:
          history.push(ROUTES.CUP);
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

  const UserMenu: React.FC = () => {
    return (
      <List>
        <MenubarItem text={ROUTENAMES.HOME} key={ROUTENAMES.HOME} />
        <MenubarItem text={ROUTENAMES.CUP} key={ROUTENAMES.CUP} />
        <MenubarItem text={ROUTENAMES.ROSTER} key={ROUTENAMES.ROSTER} />
        <MenubarItem text={ROUTENAMES.ACCOUNT} key={ROUTENAMES.ACCOUNT} />
      </List>
    );
  };

  const HideMenu: React.FC = () => {
    return (
      <List>
        <MenubarItem text={ROUTENAMES.HOME} key={ROUTENAMES.HOME} />
        <MenubarItem text={ROUTENAMES.ACCOUNT} key={ROUTENAMES.ACCOUNT} />
      </List>
    );
  };

  const LogoutMenu: React.FC = () => {
    return (
      <List>
        <ListItem button key="logout" onClick={handleLogout}>
          <ListItemText primary="로그아웃" />
        </ListItem>
      </List>
    );
  };

  const checkRoute = () => {
    const path = "/" + pathname.split("/")[1];

    switch (path) {
      case ROUTES.HOME:
        return ROUTENAMES.HOME;
      case ROUTES.CUP:
        return ROUTENAMES.CUP;
      case ROUTES.ROSTER:
        return ROUTENAMES.ROSTER;
      case ROUTES.ACCOUNT:
        return ROUTENAMES.ACCOUNT;
      default:
        return undefined;
    }
  };

  const MenubarItem: React.FC<{ text: string }> = ({ text }) => {
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
