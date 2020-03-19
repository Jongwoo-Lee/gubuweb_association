import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  ButtonBase,
  Button
} from "@material-ui/core";
import {
  CurTime,
  // useSetGoals,
  deepCopyGoals,
  useTeamRecordStack,
  useCurTeam
  // useGoals
} from "../../../../context/cup/cupRecord";
import { TeamsPos, Goal } from "../../../../helpers/Firebase/game";
import {
  convertTimeString,
  ClickScore,
  RecordType
} from "../../../../hooks/cups";
import Trophy from "../../../../images/trophy_on.svg";
import { firestore } from "firebase";
import { useAssociationValue } from "../../../../context/user";

export interface AddScoreProps {
  time: CurTime;
  teamPos: TeamsPos;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
  setClick: React.Dispatch<React.SetStateAction<RecordType>>;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    padding: "15px",
    justifyContent: "space-between"
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center"
  },
  center: {
    alignSelf: "center"
  }
});

export const AddScore: React.FC<AddScoreProps> = ({
  time,
  teamPos,
  score,
  setScore,
  setClick
}: AddScoreProps) => {
  const teamRecordData = useTeamRecordStack();
  const curTeam: string = useCurTeam();

  const classes = useStyles();
  const goals = teamRecordData[curTeam].goals;
  const setGoals = teamRecordData[curTeam].setGoals;
  const ascData = useAssociationValue();

  const avatar = (name: string | undefined | null) => (
    <div className={classes.row}>
      <div className={classes.center}>
        <img width="30" src={Trophy} alt={"팀원"} />
      </div>
      <Typography className={classes.center}>{name ?? "미입력"}</Typography>
    </div>
  );

  const handleFocusClick = (click: "goal" | "ass") => {
    const newScore: ClickScore = JSON.parse(JSON.stringify(score));
    newScore.curFocus = click;
    setScore(newScore);
  };

  const MakeGoal = (): Goal => {
    return {
      userUID: score.scorer[0],
      assist_userUID: score.scorer[1],
      timeStamp: time.curTime * 1000, // milliseconds
      quarter: time.curQuarter, // quarterIndex, curQuarter * 2 - 1
      goal_type: 0,
      log: {
        createdBy: ascData?.uid ?? "createdBy",
        timeStamp: firestore.Timestamp.now()
      }
    };
  };

  const handleAddScore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const goal: Goal = MakeGoal();
    const newGoals: Goal[] = deepCopyGoals(goals);

    setGoals([...newGoals, goal]);
    setScore({
      scorer: Array<string>(2),
      curFocus: "goal"
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // initialize
    setClick("");
    setScore({
      scorer: Array<string>(2),
      curFocus: "goal"
    });
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.col}>
        <Typography align="center">득점</Typography>
        <Typography>{convertTimeString(time.curTime)}</Typography>
        <ButtonBase onClick={handleCancel}>
          <Typography style={{ textDecoration: "underline" }}>취소</Typography>
        </ButtonBase>
      </CardContent>
      <CardContent className={classes.row}>
        <Button disableRipple onClick={e => handleFocusClick("goal")}>
          <Typography
            style={{
              textShadow:
                score.curFocus === "goal" ? " 0 0 0.2em green" : undefined
            }}
            className={classes.center}
          >
            골:
          </Typography>
        </Button>
        {avatar(score.scorer[0])}
      </CardContent>
      <CardContent className={classes.row}>
        <Button disableRipple onClick={e => handleFocusClick("ass")}>
          <Typography
            style={{
              textShadow:
                score.curFocus === "ass" ? " 0 0 0.2em green" : undefined
            }}
            className={classes.center}
          >
            도움:
          </Typography>
        </Button>
        {avatar(score.scorer[1])}
      </CardContent>
      <CardContent className={classes.col}>
        <Button onClick={handleAddScore} variant="outlined">
          적용
        </Button>
      </CardContent>
    </Card>
  );
};
