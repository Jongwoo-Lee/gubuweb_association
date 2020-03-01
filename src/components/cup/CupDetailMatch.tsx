import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography } from "@material-ui/core";

import { PreliminaryMatch } from "./match/PreliminaryMatch";
import { CupInfo } from "../../helpers/Firebase/cup";
import { RouteComponentProps } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { FinalMatch } from "./match/FinalMatch";
import { EditCupMatchProvider } from "../../context/cup/cupMatch";
import { SaveMatchBtn } from "./match/SaveMatchInfo";

export interface MatchParams {
  cupID: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    title: {
      width: "80%",
      margin: "50px 0px 0px 0px"
    }
  })
);

export const CupDetailMatch: React.SFC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const classes = useStyles();
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined;
  if (cupsInfo !== undefined) cupInfo = cupsInfo[cupID];

  return (
    <EditCupMatchProvider cupInfo={cupInfo}>
      <div className={classes.root}>
        <TitleGoBack title={cupInfo?.name ?? "No data"} />
        <Grid
          className={classes.title}
          container
          spacing={3}
          justify="space-between"
          alignItems="flex-start"
        >
          <Typography color="textPrimary" variant="h4">
            {ROUTENAMES.CUP_DETAIL_TEAM}
          </Typography>
          <SaveMatchBtn cupID={cupID} />
        </Grid>
        <PreliminaryMatch />
        <FinalMatch />
      </div>
    </EditCupMatchProvider>
  );
};
