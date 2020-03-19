import React from "react";
import { CupInfo } from "../../../models";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Paper,
  CircularProgress
} from "@material-ui/core";
import {
  convertGroupString,
  convertFinalCardString
} from "../../../context/cup/cupMatch";
import { TitleGoBack } from "../../common/TitleGoBack";
import { ROUTENAMES } from "../../../constants/routes";
import { CupPlanDataStructure } from "../../../context/cup/cupPlan";
import { GameCard } from "../../../context/game/game";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { convertKoTime } from "../plan/DatePickerDlg";
import {
  useRecordloading,
  useCurTeam,
  useSetCurTeam,
  useTeamRecordStack
} from "../../../context/cup/cupRecord";
import { RecordField } from "./field/RecordField";
import { fromGameInfo } from "../../../hooks/cups";
import {
  Record,
  TeamsRecord,
  saveRecord
} from "../../../helpers/Firebase/game";

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
  cupID: string;
  cupInfo: CupInfo;
  gameCard: GameCard;
}

export const WrapCupDetailRecord: React.FC<WrapCupDetailRecordProps> = ({
  cupID,
  cupInfo,
  gameCard
}: WrapCupDetailRecordProps) => {
  const classes = useStyles();
  let matchPlan: CupPlanDataStructure | null = cupInfo.matchPlan;
  const { gameTime, numOfQuarter } = fromGameInfo(matchPlan, gameCard);
  const curTeam = useCurTeam();
  const setCurTeam = useSetCurTeam();
  const recordStack = useTeamRecordStack();

  const curScore = () => {
    const goal1: number = recordStack[gameCard.team1 ?? "team1"].goals.length;
    const goal2: number = recordStack[gameCard.team2 ?? "team2"].goals.length;

    return `${goal1} : ${goal2}`;
  };

  const handleChangeTeam = (team: string) => {
    setCurTeam(team);
  };

  const loading = useRecordloading();

  const title: string =
    gameCard.group === undefined
      ? `${convertFinalCardString(gameCard.id)}`
      : `${convertGroupString(gameCard.group)}조 - ${gameCard.id + 1}경기`;

  const handleOnSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const record1: Record = {
      score: recordStack[gameCard.team1 ?? "team1"].goals,
      substitution: recordStack[gameCard.team1 ?? "team1"].pos,
      real_attendance: [],
      team: gameCard.team1 ?? "team1"
    };

    const record2: Record = {
      score: recordStack[gameCard.team2 ?? "team2"].goals,
      substitution: recordStack[gameCard.team2 ?? "team2"].pos,
      real_attendance: [],
      team: gameCard.team2 ?? "team2"
    };

    await saveRecord(
      cupID,
      gameCard?.gid ?? "",
      new TeamsRecord(record1, record2)
    );
  };

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
        <Button
          onClick={handleOnSave}
          style={{ backgroundColor: "white" }}
          variant="contained"
        >
          저장
        </Button>
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
      <Grid container spacing={3} direction="row">
        <Grid
          container
          direction="column"
          item
          xs
          style={{ alignSelf: "center" }}
        >
          <Button
            variant="contained"
            style={{
              borderRadius: 35,
              backgroundColor:
                curTeam === (gameCard.team1 ?? "team1") ? "#21b6ae" : undefined
            }}
            onClick={e => handleChangeTeam(gameCard.team1 ?? "team1")}
          >
            <Typography align="center" color="textPrimary" variant="h4">
              Home
            </Typography>
          </Button>
        </Grid>
        <Grid item xs style={{ alignSelf: "center" }}>
          <Typography align="center" color="textPrimary" variant="h4">
            {curScore()}
          </Typography>
        </Grid>

        <Grid
          container
          direction="column"
          item
          xs
          style={{ alignSelf: "center" }}
        >
          <Button
            style={{
              borderRadius: 35,
              backgroundColor:
                curTeam === (gameCard.team2 ?? "team2") ? "#21b6ae" : undefined
            }}
            variant="contained"
            onClick={e => handleChangeTeam(gameCard.team2 ?? "team2")}
          >
            <Typography align="center" color="textPrimary" variant="h4">
              Away
            </Typography>
          </Button>
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
      <RecordField gameTime={gameTime} numOfQuarter={numOfQuarter} />
    </div>
  );
};
