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
import { MENU, ROUTES } from "../../constants/routes";
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

  const handleMenuClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (checkRoute() === index) {
    } else if (index === 0) {
      history.push(ROUTES.HOME);
    } else if (index === 3) {
      history.push(ROUTES.ACCOUNT);
    } else if (ascData && ascData.isVerified) {
      switch (index) {
        case 0:
          history.push(ROUTES.HOME);
          break;
        case 1:
          history.push(ROUTES.CONTEST);
          break;
        case 2:
          history.push(ROUTES.ROSTER);
          break;
        case 3:
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
        {MENU.map((text, index) => (
          <MenubarItem text={text} index={index} key={text} />
        ))}
      </List>
    );
  };

  const HideMenu: React.SFC = () => {
    return (
      <List>
        <MenubarItem text={MENU[0]} index={0} key={MENU[0]} />
        <MenubarItem text={MENU[3]} index={3} key={MENU[3]} />
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
        return 0;
      case ROUTES.CONTEST:
        return 1;
      case ROUTES.ROSTER:
        return 2;
      case ROUTES.ACCOUNT:
        return 3;
      default:
        return -1;
    }
  };

  const MenubarItem: React.SFC<{ text: string; index: number }> = ({
    text,
    index
  }) => {
    return (
      <ListItem button onClick={e => handleMenuClick(e, index)} key={text}>
        <ListItemText
          disableTypography
          primary={
            checkRoute() === index ? (
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
