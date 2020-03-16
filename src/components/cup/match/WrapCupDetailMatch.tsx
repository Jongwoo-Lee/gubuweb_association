import React from "react";
import { ROUTENAMES } from "../../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { TitleGoBack } from "../../common/TitleGoBack";
import { Grid, Typography } from "@material-ui/core";

import { PreliminaryMatch } from "../match/PreliminaryMatch";
import { CupInfo } from "../../../models";
import { FinalMatch } from "../match/FinalMatch";
import { EditCupMatchProvider } from "../../../context/cup/cupMatch";
import { SaveMatchBtn } from "../match/SaveMatchInfo";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    width: "80%",
    margin: "50px 0px 0px 0px"
  }
});

export interface WrapCupDetailPlanProps {
  cupInfo: CupInfo;
  cupID: string;
}

export const WrapCupDetailMatch: React.FC<WrapCupDetailPlanProps> = ({
  cupInfo,
  cupID
}: WrapCupDetailPlanProps) => {
  const classes = useStyles();

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
            {ROUTENAMES.CUP_DETAIL_MATCH}
          </Typography>
          <SaveMatchBtn cupID={cupID} />
        </Grid>
        <PreliminaryMatch />
        <FinalMatch />
      </div>
    </EditCupMatchProvider>
  );
};
