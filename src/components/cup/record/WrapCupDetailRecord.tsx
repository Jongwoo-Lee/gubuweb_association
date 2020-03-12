import React from "react";
import { CupInfo } from "../../../helpers/Firebase/cup";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import {
  CupMatchInfo,
  convertGroupString,
  convertFinalString
} from "../../../context/cup/cupMatch";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { CupPlanDataStructure } from "../../../context/cup/cup";
import { SubGameInfo } from "../../../context/game/game";
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

export interface WrapCupDetailRecordProps {
  cupInfo: CupInfo;
  gameInfo: SubGameInfo;
}

export const WrapCupDetailRecord: React.FC<WrapCupDetailRecordProps> = ({
  cupInfo,
  gameInfo
}: WrapCupDetailRecordProps) => {
  const classes = useStyles();
  let matchPlan: CupPlanDataStructure | null = cupInfo.matchPlan;
  const title: string =
    gameInfo.group === undefined
      ? `${convertFinalString(gameInfo.id)}`
      : `${convertGroupString(gameInfo.group)}조 - ${gameInfo.id + 1}경기`;
  console.log("hahahaha");
  console.dir(gameInfo.id);
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
          {ROUTENAMES.CUP_DETAIL_RECORD}
        </Typography>
        <Button variant="contained">저장</Button>
      </Grid>
      <Typography color="textPrimary" variant="h4">
        {title}
      </Typography>

      {
        //   matchInfo ? (
        //     <PreliminaryPlan
        //       matchInfo={matchInfo}
        //       planPre={planPre}
        //       setPlanPre={setPlanPre}
        //     />
        //   ) :
        <Typography color="textPrimary" variant="h4">
          예선경기 정보가 없습니다.
        </Typography>
      }
    </div>
  );
};
