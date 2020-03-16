import React from "react";
import { saveCupPlan } from "../../../helpers/Firebase/cup";
import { CupInfo } from "../../../models";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { PlanPreliminary, PlanFinal } from "../../../context/cup/cupPlan";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { PreliminaryPlan } from "./PreliminaryPlan";
import { FinalPlan } from "./FinalPlan";
import { useGamePlan } from "../../../hooks/cups";
export interface CupDetailPlanProps {}

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

export const WrapCupDetailPlans: React.FC<WrapCupDetailPlanProps> = ({
  cupInfo,
  cupID
}: WrapCupDetailPlanProps) => {
  const classes = useStyles();
  const {
    planPre,
    setPlanPre,
    planFinal,
    setPlanFinal,
    matchInfo
  } = useGamePlan(cupInfo);

  const handleOnSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    saveCupPlan(cupID, planPre, planFinal);
  };

  return (
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
          {ROUTENAMES.CUP_DETAIL_PLAN}
        </Typography>
        <Button variant="contained" onClick={handleOnSave}>
          저장
        </Button>
      </Grid>
      <PreliminaryPlan />
      <FinalPlan />
    </div>
  );
};
