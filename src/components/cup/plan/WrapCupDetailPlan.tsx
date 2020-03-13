import React, { useState } from "react";
import { CupInfo, saveCupPlan } from "../../../helpers/Firebase/cup";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { CupMatchInfo, fromMatchInfo } from "../../../context/cup/cupMatch";
import { PlanPreliminary, PlanFinal } from "../../../context/cup/cup";
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
  // let matchInfo: CupMatchInfo =
  //   cupInfo.matchInfo ?? false
  //     ? fromMatchInfo(cupInfo?.matchInfo ?? undefined) // cupInfo?.matchInfo <-- ? 없앨수 없는 버그
  //     : fromMatchInfo();
  // const [planPre, setPlanPre] = useState<PlanPreliminary>(
  //   cupInfo.matchPlan?.p ?? {
  //     gI: { nQ: 2, gT: 45, rT: 15 }
  //   }
  // );

  // const [planFinal, setPlanFinal] = useState<PlanFinal>(
  //   remakeFinalPlan(cupInfo, matchInfo)
  // );

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
      {matchInfo ? (
        <PreliminaryPlan
          matchInfo={matchInfo}
          planPre={planPre}
          setPlanPre={setPlanPre}
        />
      ) : (
        <Typography color="textPrimary" variant="h4">
          예선경기 정보가 없습니다.
        </Typography>
      )}
      {matchInfo ? (
        <FinalPlan
          matchInfo={matchInfo}
          planFinal={planFinal}
          setPlanFinal={setPlanFinal}
        />
      ) : (
        <Typography color="textPrimary" variant="h4">
          본선경기 정보가 없습니다.
        </Typography>
      )}
    </div>
  );
};
