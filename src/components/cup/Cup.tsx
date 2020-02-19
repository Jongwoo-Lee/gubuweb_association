import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddCup } from "./AddCup";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoback } from "../common/TitleGoBack";
//  import Trophy from "../../images/trophy_on.svg";
import AddIcon from "@material-ui/icons/Add";

export interface CupMainProps { }

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

export const Cup = (props: RouteComponentProps) => {
  return (
    <div>
      <Route exact path={props.match.path} component={CupComponent} />
      <Route path={ROUTES.ADD_CUP} component={AddCup} />
    </div>
  );
};

export const CupComponent: React.SFC<CupMainProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoback title={ROUTENAMES.CUP} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.ADD_CUP}
          route={ROUTES.ADD_CUP}
          ImgIcon={AddIcon}
        />
      </div>
    </div>
  );
};
