import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddCup } from "./AddCup";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoBack } from "../common/TitleGoBack";
//  import Trophy from "../../images/trophy_on.svg";
import AddIcon from "@material-ui/icons/Add";
import { CupDetail } from "./CupDetail";
import { CupDetailTeam } from "./CupDetailTeam";
import { CupDetailTree } from "./CupDetailTree";
import { CupDetailRecord } from "./CupDetailRecord";
import { CupDetailResult } from "./CupDetailResult";
import { CupDetailPlan } from "./CupDetailPlan";
import { CupInfoProvider } from "../../context/cup/cup";
import { useAssociationValue } from "../../context/user";

export interface CupMainProps {}

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
  const ascData = useAssociationValue();
  return (
    <div>
      <CupInfoProvider cuplist={ascData?.cupList}>
        <Route exact path={props.match.path} component={CupComponent} />
        <Route path={ROUTES.ADD_CUP} component={AddCup} />
        <Route exact path={ROUTES.CUP_DETAIL} component={CupDetail} />
        <Route path={ROUTES.CUP_DETAIL_TEAM} component={CupDetailTeam} />
        <Route path={ROUTES.CUP_DETAIL_TREE} component={CupDetailTree} />
        <Route path={ROUTES.CUP_DETAIL_PLAN} component={CupDetailPlan} />
        <Route path={ROUTES.CUP_DETAIL_RECORD} component={CupDetailRecord} />
        <Route path={ROUTES.CUP_DETAIL_RESULT} component={CupDetailResult} />
      </CupInfoProvider>
    </div>
  );
};

export const CupComponent: React.SFC<CupMainProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.ADD_CUP}
          route={ROUTES.ADD_CUP}
          ImgIcon={AddIcon}
        />
        {/* {나중에 cup 로드되면 삭제할 예정임.} */}
        <SquareRouteButton
          title={ROUTENAMES.CUP_DETAIL}
          route={ROUTES.CUP_DETAIL}
          ImgIcon={AddIcon}
        />
      </div>
    </div>
  );
};
