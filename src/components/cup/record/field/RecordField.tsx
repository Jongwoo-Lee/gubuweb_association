import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  ButtonBase,
  Paper,
  Typography
} from "@material-ui/core";
import { RecordShow } from "../field/RecordShow";
import { Board } from "./Board";
import { Bench } from "./Bench";
import {
  usePosition,
  convertTimeString,
  TempSubData,
  RecordType,
  ClickScore
} from "../../../../hooks/cups";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import {
  CurTime,
  useTeamRecordStack,
  useCurTeam
} from "../../../../context/cup/cupRecord";
import { CustomSliderComponent } from "./CustomSliderComponent";
import { ChangeQaurter } from "./ChangeQuarter";
import { AddScore } from "./AddScore";

export interface RecordFieldProps {
  gameTime: number;
  numOfQuarter: number;
}
const useStyles = makeStyles({
  margin: {
    marginTop: "20px",
    height: "700px"
  }
});

export const RecordField: React.FC<RecordFieldProps> = ({
  gameTime,
  numOfQuarter
}: RecordFieldProps) => {
  const classes = useStyles();
  const [click, setClick] = useState<RecordType>("");
  const [curTime, setcurTime] = useState<CurTime>({
    curQuarter: 1,
    curTime: 0
  });

  const teamRecordData = useTeamRecordStack();
  const curTeam: string = useCurTeam();

  const tempData: Array<TempSubData> = teamRecordData[curTeam].tempSubData;
  const teamPos: TeamsPos = usePosition(tempData, curTime); // usePosition(curTime);
  const [selUsr, setSelUsr] = useState<number>(-1);
  const [score, setScore] = useState<ClickScore>({
    scorer: Array<string>(2),
    curFocus: "goal"
  });

  const handleScoreClick = (e: RecordType) => {
    if (click !== "score") {
      setClick(e);
    } else setClick("");
  };

  const handleSubClick = (e: RecordType) => {
    if (click !== "sub") {
      setClick(e);
    } else setClick("");
  };

  return (
    <div>
      <CustomSliderComponent
        gameTime={convertTimeString(gameTime * 60)}
        time={curTime}
        setTime={setcurTime}
        tempData={tempData}
      />
      <ChangeQaurter
        numOfQuarter={numOfQuarter}
        time={curTime}
        setTime={setcurTime}
      />
      <Grid
        container
        spacing={10}
        alignItems="center"
        direction="row"
        justify="center"
        wrap="nowrap"
      >
        <Grid item>
          <ButtonBase color="primary" onClick={e => handleScoreClick("score")}>
            <Paper
              style={{
                padding: "20px",
                background: click === "score" ? "green" : undefined
              }}
            >
              <Typography color="textPrimary" variant="h4">
                득점
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase onClick={e => handleSubClick("sub")}>
            <Paper
              style={{
                padding: "20px",
                background: click === "sub" ? "green" : undefined
              }}
            >
              <Typography color="textPrimary" variant="h4">
                선발/교체
              </Typography>
            </Paper>
          </ButtonBase>
        </Grid>
      </Grid>
      {click === "score" && (
        <Grid container justify="center">
          <Grid item xs={10}>
            <AddScore
              time={curTime}
              teamPos={teamPos}
              score={score}
              setScore={setScore}
              setClick={setClick}
            />
          </Grid>
        </Grid>
      )}
      <Grid container spacing={1} className={classes.margin}>
        <Grid item xs={8}>
          <Board
            rType={click}
            teamPos={teamPos}
            curTime={curTime}
            score={score}
            setScore={setScore}
            selUsr={selUsr}
            setSelUsr={setSelUsr}
          />
        </Grid>
        <Grid item xs>
          <Bench
            rType={click}
            teamPos={teamPos}
            curTime={curTime}
            score={score}
            setScore={setScore}
            selUsr={selUsr}
            setSelUsr={setSelUsr}
          />
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
