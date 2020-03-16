import React from "react";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { CupDetailTeam } from "./CupDetailTeam";
import { CupDetailMatch } from "./CupDetailMatch";
import { CupDetailResult } from "./CupDetailResult";
import { CupDetailPlan } from "./CupDetailPlan";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoBack } from "../common/TitleGoBack";
import Trophy from "../../images/trophy_on.svg";
import TeamIcon from "../../images/team_off.svg";
import AddIcon from "@material-ui/icons/Add";

export interface CupDetailProps extends RouteComponentProps {}

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

export const CupDetail: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const propPath = props.match.path + "/:cupID";
  return (
    <div>
      <Route exact path={propPath} component={CupDetailComponent} />
      <Route
        path={propPath + ROUTES.CUP_DETAIL_TEAM}
        component={CupDetailTeam}
      />
      <Route
        path={propPath + ROUTES.CUP_DETAIL_MATCH}
        component={CupDetailMatch}
      />
      <Route
        path={propPath + ROUTES.CUP_DETAIL_PLAN}
        component={CupDetailPlan}
      />
      <Route
        path={propPath + ROUTES.CUP_DETAIL_RESULT}
        component={CupDetailResult}
      />
    </div>
  );
};

export const CupDetailComponent: React.SFC<CupDetailProps> = () => {
  const classes = useStyles();
  const match = useRouteMatch<{ cupID: string }>();

  const buttonRoute = (routeName: string) => {
    return match.url + routeName;
  };

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP_DETAIL} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_TEAM}
          route={buttonRoute(ROUTES.CUP_DETAIL_TEAM)}
          imgSrc={TeamIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_MATCH}
          route={buttonRoute(ROUTES.CUP_DETAIL_MATCH)}
          ImgIcon={AddIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_PLAN}
          route={buttonRoute(ROUTES.CUP_DETAIL_PLAN)}
          ImgIcon={AddIcon}
        />
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL_RESULT}
          route={buttonRoute(ROUTES.CUP_DETAIL_RESULT)}
          imgSrc={Trophy}
        />
      </div>
    </div>
  );
};
