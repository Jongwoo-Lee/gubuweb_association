import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddContest } from "./AddContest";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareButton } from "../common/SquareButton";
//  import Trophy from "../../images/trophy_on.svg";
import AddIcon from "@material-ui/icons/Add";
import TitleGoback from "../common/TitleGoBack";

export interface ContestMainProps {}

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
  // const classes = useStyles();
  return (
    <div>
      <Route exact path={props.match.path} component={ContestComponent} />
      <Route path={ROUTES.ADD_CONTEST} component={AddContest} />
      {/* <Route path={`${props.match.path}/privacy`} component={Privacy} /> */}
    </div>
  );
};

export const ContestComponent: React.SFC<ContestMainProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoback title={ROUTENAMES.CONTEST} />
      <div className={classes.cards}>
        <SquareButton
          title={ROUTENAMES.ADD_CONTEST}
          route={ROUTES.ADD_CONTEST}
          ImgIcon={AddIcon}
        />
      </div>
    </div>
  );
};
