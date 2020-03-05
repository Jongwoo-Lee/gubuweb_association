import React, { useState } from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography, Button } from "@material-ui/core";
import { SaveMatchBtn } from "./match/SaveMatchInfo";
import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "./CupDetailTeam";
import { useCupsInfo, PlanPreliminary } from "../../context/cup/cup";
import { CupInfo } from "../../helpers/Firebase/cup";
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
  let cupInfo: CupInfo | undefined;
  let matchInfo: CupMatchInfo | undefined;
  const [planPre, setPlanPre] = useState<PlanPreliminary>({});
  if (cupsInfo !== undefined) {
    cupInfo = cupsInfo[cupID];
    if (cupInfo?.matchInfo ?? false)
      matchInfo = fromMatchInfo(cupInfo?.matchInfo ?? undefined);
  }

  const handleOnSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
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
          예선전 정보가 없습니다.
        </Typography>
      )}
      <FinalPlan />
    </div>
  );
};
