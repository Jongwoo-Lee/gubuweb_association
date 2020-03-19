import React from "react";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  ButtonBase,
  Button
} from "@material-ui/core";
import { CurTime } from "../../../../context/cup/cupRecord";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { convertTimeString, ClickScore } from "../../../../hooks/cups";
import Trophy from "../../../../images/trophy_on.svg";

export interface AddScoreProps {
  time: CurTime;
  teamPos: TeamsPos;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
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
  setScore
}: AddScoreProps) => {
  const classes = useStyles();

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

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.col}>
        <Typography align="center">득점</Typography>
        <Typography>{convertTimeString(time.curTime)}</Typography>
        <ButtonBase>
          <Typography>취소</Typography>
        </ButtonBase>
      </CardContent>
      <CardContent className={classes.row}>
        <Button onClick={e => handleFocusClick("goal")}>
          <Typography
            style={{
              fontWeight: score.curFocus === "goal" ? "bold" : "normal"
            }}
            className={classes.center}
          >
            골:
          </Typography>
        </Button>
        {avatar(score.scorer[0])}
      </CardContent>
      <CardContent className={classes.row}>
        <Button onClick={e => handleFocusClick("ass")}>
          <Typography
            style={{ fontWeight: score.curFocus === "ass" ? "bold" : "normal" }}
            className={classes.center}
          >
            도움:
          </Typography>
        </Button>
        {avatar(score.scorer[1])}
      </CardContent>
      <CardContent className={classes.col}>
        <Button variant="outlined">적용</Button>
      </CardContent>
    </Card>
  );
};
