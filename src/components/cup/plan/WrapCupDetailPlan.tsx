import React, { useState } from "react";
import { CupInfo, saveCupPlan } from "../../../helpers/Firebase/cup";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { CupMatchInfo, fromMatchInfo } from "../../../context/cup/cupMatch";
import { PlanPreliminary, PlanFinal } from "../../../context/cup/cup";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { PreliminaryPlan } from "./PreliminaryPlan";
import { FinalPlan } from "./FinalPlan";
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
  let matchInfo: CupMatchInfo =
    cupInfo.matchInfo ?? false
      ? fromMatchInfo(cupInfo?.matchInfo ?? undefined) // cupInfo?.matchInfo <-- ? 없앨수 없는 버그
      : fromMatchInfo();
  const [planPre, setPlanPre] = useState<PlanPreliminary>(
    cupInfo.matchPlan?.p ?? {
      gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 }
    }
  );

  const [planFinal, setPlanFinal] = useState<PlanFinal>(
    remakeFinalPlan(cupInfo, matchInfo)
  );

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

const remakeFinalPlan = (
  cupInfo: CupInfo,
  matchInfo: CupMatchInfo
): PlanFinal => {
  let finalPlan: PlanFinal = {
    gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 }
  };

  if (cupInfo.matchPlan) {
    finalPlan = cupInfo.matchPlan.f;

    if (finalPlan.t) {
      const round: number = Number(matchInfo.f.round);

      let j: number = 0;
      for (let i = round * 2; i > round; i--) {
        let team: string = "";
        if (matchInfo.f.order[j]) team = matchInfo.f.order[j] ?? "";

        // finalPlan데이터가 있으면 그것을 우선 사용한다.
        if (finalPlan.t[i] && finalPlan.t[i] === "") {
          console.log(`finalPlan.t[i] 만드는 중 `);
          console.dir(finalPlan.t[i]);
          finalPlan.t[i] = team;
        }
        j++;
      }
    } else {
      finalPlan.t = {};
      const round: number = Number(matchInfo.f.round);

      let j: number = 0;
      for (let i = round * 2; i > round; i--) {
        let team: string = "";
        if (matchInfo.f.order[j]) team = matchInfo.f.order[j] ?? "";
        finalPlan.t[i] = team;
        j++;
      }
    }
  }

  return finalPlan;
};
