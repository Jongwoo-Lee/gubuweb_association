import React from "react";
import { Route, RouteComponentProps, useRouteMatch } from "react-router-dom";

import { ROUTES, ROUTENAMES } from "../../constants/routes";
import { AddCup } from "./AddCup";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SquareRouteButton } from "../common/SquareButton";
import { TitleGoBack } from "../common/TitleGoBack";
import Trophy from "../../images/trophy_on.svg";
import AddIcon from "@material-ui/icons/Add";
import { CupDetail } from "./CupDetail";
import {
  CupInfoProvider,
  useCupsInfo,
  useIsCupLoading,
  useSetCurCupID
} from "../../context/cup/cup";
import { useAssociationValue } from "../../context/user";
import { CircularProgress } from "@material-ui/core";

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
      flexWrap: "wrap",
      alignItems: "center"
    },
    progress: {
      width: "50%",
      height: "50%",
      marginLeft: "100px"
    }
  })
);

export const Cup = (props: RouteComponentProps) => {
  const ascData = useAssociationValue();
  return (
    <CupInfoProvider cuplist={ascData?.cupList}>
      <div>
        <Route exact path={props.match.path} component={CupComponent} />
        <Route path={ROUTES.ADD_CUP} component={AddCup} />
        <Route
          path={`${props.match.path}${ROUTES.CUP_DETAIL}`}
          component={CupDetail}
        />
      </div>
    </CupInfoProvider>
  );
};

const CupComponent: React.SFC<CupMainProps> = () => {
  const classes = useStyles();
  const isLoading = useIsCupLoading();
  const cupsInfo = useCupsInfo();
  const ascData = useAssociationValue();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.ADD_CUP}
          route={ROUTES.ADD_CUP}
          ImgIcon={AddIcon}
        />
        {isLoading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          cupsInfo !== undefined &&
          cupsInfo !== {} &&
          ascData?.cupList?.map(cupID => {
            return <CupButton key={cupID} cupID={cupID} />;
          })
        )}
      </div>
    </div>
  );
};

const CupButton: React.SFC<{ cupID: string }> = ({ cupID }) => {
  const cupsInfo = useCupsInfo();
  const match = useRouteMatch();
  const setCurCupID = useSetCurCupID();

  const clickEvent = () => {
    setCurCupID(cupID);
  };

  if (cupsInfo !== undefined) {
    const cupInfo = cupsInfo[cupID];

    return (
      <SquareRouteButton
        title={cupInfo?.name ?? "No data"}
        route={`${match.path}${ROUTES.CUP_DETAIL}/${cupID}`}
        imgSrc={Trophy}
        clickEvent={clickEvent}
      />
    );
  } else return <div></div>;
};
