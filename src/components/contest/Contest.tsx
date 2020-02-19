import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddContest } from "./AddContest";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoback } from "../common/TitleGoBack";
//  import Trophy from "../../images/trophy_on.svg";
import AddIcon from "@material-ui/icons/Add";

export interface ContestMainProps { }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    cards: {
      display: "flex",
      marginTop: "40px",
      flexWrap: "wrap"
    }
  })
);

export const Contest = (props: RouteComponentProps) => {
  return (
    <div>
      <Route exact path={props.match.path} component={ContestComponent} />
      <Route path={ROUTES.ADD_CONTEST} component={AddContest} />
    </div>
  );
};

export const ContestComponent: React.SFC<ContestMainProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoback title={ROUTENAMES.CONTEST} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.ADD_CONTEST}
          route={ROUTES.ADD_CONTEST}
          ImgIcon={AddIcon}
        />
      </div>
    </div>
  );
};
