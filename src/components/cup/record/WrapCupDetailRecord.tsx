import React from "react";
import { CupInfo } from "../../../helpers/Firebase/cup";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Icon,
  Paper,
  Slider
} from "@material-ui/core";
import {
  convertGroupString,
  convertFinalString
} from "../../../context/cup/cupMatch";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { CupPlanDataStructure } from "../../../context/cup/cup";
import { SubGameInfo } from "../../../context/game/game";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { convertKoTime } from "../plan/DatePickerDlg";
import { CustomSlider } from "./CustomSlider";
import { convertTimeString, fromGameInfo } from "../../../hooks/cups";
import { ChangeQaurter } from "./ChangeQuarter";

export interface CupDetailPlanProps {}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  },
  title: {
    margin: "50px 0px 0px 0px"
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    margin: "10px 10px 0px 0px"
  },

  paper: {
    padding: "15px 0px 15px 0px"
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
  const { gameTime, numOfQuarter } = fromGameInfo(matchPlan, gameInfo);

  const title: string =
    gameInfo.group === undefined
      ? `${convertFinalString(gameInfo.id)}`
      : `${convertGroupString(gameInfo.group)}조 - ${gameInfo.id + 1}경기`;

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
      <Typography align="center" color="textPrimary" variant="h4">
        {title}
      </Typography>

      <div className={classes.row}>
        <LocationOnIcon className={classes.icon} />
        <Typography align="left" color="textPrimary" variant="h6">
          {"location"}
        </Typography>
      </div>

      <div className={classes.row}>
        <CalendarTodayIcon className={classes.icon} />
        <Typography align="left" color="textPrimary" variant="h6">
          {gameInfo?.kickOffTime
            ? convertKoTime(gameInfo?.kickOffTime.toDate())
            : ""}
        </Typography>
      </div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography align="center" color="textPrimary" variant="h4">
            {gameInfo.team1}
          </Typography>
        </Grid>
        <Grid item xs />

        <Grid item xs>
          <Typography align="center" color="textPrimary" variant="h4">
            {gameInfo.team2}
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography align="center" color="textPrimary" variant="h4">
              Home
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Typography align="center" color="textPrimary" variant="h4">
            score
          </Typography>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography align="center" color="textPrimary" variant="h4">
              Away
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography align="center" color="textPrimary" variant="h4">
              참석 명단
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography align="center" color="textPrimary" variant="h4">
              경기 기록
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography align="center" color="textPrimary" variant="h4">
              경기 결과
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <CustomSlider gameTime={convertTimeString(gameTime * 60)} />
      <ChangeQaurter numOfQuarter={numOfQuarter} />

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
