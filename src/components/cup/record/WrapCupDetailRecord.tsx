import React from "react";
import { CupInfo } from "../../../helpers/Firebase/cup";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import { CupMatchInfo } from "../../../context/cup/cupMatch";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { CupPlanDataStructure } from "../../../context/cup/cup";
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
  gameID: string;
  id: number;
  group: number;
}

export const WrapCupDetailRecord: React.FC<WrapCupDetailRecordProps> = ({
  cupInfo,
  gameID,
  id,
  group
}: WrapCupDetailRecordProps) => {
  const classes = useStyles();
  let matchPlan: CupPlanDataStructure | null = cupInfo.matchPlan;
  console.log(`${gameID} - ${id} - ${group}`);
  console.dir(matchPlan);
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
        <Button variant="contained">저장</Button>
      </Grid>
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
