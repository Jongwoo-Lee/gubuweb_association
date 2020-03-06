import React, { useState } from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography, Button } from "@material-ui/core";
import { SaveMatchBtn } from "./match/SaveMatchInfo";
import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "./CupDetailTeam";
import { useCupsInfo, PlanPreliminary, PlanFinal } from "../../context/cup/cup";
import { CupInfo, saveCupPlan } from "../../helpers/Firebase/cup";
import { PreliminaryPlan } from "./plan/PreliminaryPlan";
import { FinalPlan } from "./plan/FinalPlan";
import { CupMatchInfo, fromMatchInfo } from "../../context/cup/cupMatch";

export interface CupDetailPlanProps {}

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

export const CupDetailPlan: React.FC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const classes = useStyles();
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined = cupsInfo ? cupsInfo[cupID] : undefined;

  let matchInfo: CupMatchInfo =
    cupInfo?.matchInfo ?? false
      ? fromMatchInfo(cupInfo?.matchInfo ?? undefined) // cupInfo?.matchInfo <-- ? 없앨수 없는 버그
      : fromMatchInfo();
  const [planPre, setPlanPre] = useState<PlanPreliminary>(
    cupInfo?.matchPlan?.p ?? {
      gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 }
    }
  );
  const [planFinal, setPlanFinal] = useState<PlanFinal>(
    cupInfo?.matchPlan?.f ?? {
      gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 }
    }
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
          {ROUTENAMES.CUP_DETAIL_TEAM}
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
