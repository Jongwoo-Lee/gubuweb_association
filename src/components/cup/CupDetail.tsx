import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddCup } from "./AddCup";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoBack } from "../common/TitleGoBack";
import Trophy from "../../images/trophy_on.svg";
import TeamIcon from "../../images/team_off.svg";
import AddIcon from "@material-ui/icons/Add";

export interface CupDetailProps {}

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

export const CupDetail: React.SFC<CupDetailProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP_DETAIL} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_TEAM}
          route={ROUTES.CUP_DETAIL_TEAM}
          imgSrc={TeamIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_TREE}
          route={ROUTES.CUP_DETAIL_TREE}
          ImgIcon={AddIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_PLAN}
          route={ROUTES.CUP_DETAIL_PLAN}
          ImgIcon={AddIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_RECORD}
          route={ROUTES.CUP_DETAIL_RECORD}
          ImgIcon={AddIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_RESULT}
          route={ROUTES.CUP_DETAIL_RESULT}
          imgSrc={Trophy}
        />
      </div>
    </div>
  );
};
