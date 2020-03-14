import React from "react";
import { CupInfo } from "../../../helpers/Firebase/cup";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Icon,
  Paper,
  Slider,
  CircularProgress
} from "@material-ui/core";
import {
  convertGroupString,
  convertFinalCardString
} from "../../../context/cup/cupMatch";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { CupPlanDataStructure } from "../../../context/cup/cup";
import { GameCard } from "../../../context/game/game";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { convertKoTime } from "../plan/DatePickerDlg";
import { CustomSlider } from "./CustomSlider";
import { convertTimeString, fromGameInfo } from "../../../hooks/cups";
import { ChangeQaurter } from "./ChangeQuarter";
import { RecordComponents } from "./RecordComponents";
import { useRecordloading } from "../../../context/cup/cupRecord";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  },
  title: {
    marginTop: "50px"
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
  },
  progress: {
    margin: "100px"
  }
});

export interface WrapCupDetailRecordProps {
  cupInfo: CupInfo;
  gameCard: GameCard;
}

export const WrapCupDetailRecord: React.FC<WrapCupDetailRecordProps> = ({
  cupInfo,
  gameCard
}: WrapCupDetailRecordProps) => {
  const classes = useStyles();
  let matchPlan: CupPlanDataStructure | null = cupInfo.matchPlan;
  const { gameTime, numOfQuarter } = fromGameInfo(matchPlan, gameCard);

  const loading = useRecordloading();

  const title: string =
    gameCard.group === undefined
      ? `${convertFinalCardString(gameCard.id)}`
      : `${convertGroupString(gameCard.group)}조 - ${gameCard.id + 1}경기`;

  return loading ? (
    <Grid container direction="row" justify="center" alignItems="center">
      <CircularProgress className={classes.progress} />
    </Grid>
  ) : (
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
          {gameCard?.kickOffTime
            ? convertKoTime(gameCard?.kickOffTime.toDate())
            : ""}
        </Typography>
      </div>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography align="center" color="textPrimary" variant="h4">
            {gameCard.team1}
          </Typography>
        </Grid>
        <Grid item xs />

        <Grid item xs>
          <Typography align="center" color="textPrimary" variant="h4">
            {gameCard.team2}
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
      <RecordComponents />
    </div>
  );
};
