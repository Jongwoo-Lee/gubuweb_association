import React, { useState } from "react";
import { Grid, makeStyles, ButtonBase } from "@material-ui/core";
import { RecordShow } from "../field/RecordShow";
import { Board } from "./Board";
import { Bench } from "./Bench";
import { RecordScore } from "./RecordScore";
import { RecordSubstitution } from "./RecordSubstitution";
import {
  usePosition,
  convertTimeString,
  TempSubData
} from "../../../../hooks/cups";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { CurTime, useTempSubData } from "../../../../context/cup/cupRecord";
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

export type RecordType = "score" | "sub" | "";

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
  const tempData: Array<TempSubData> = useTempSubData();
  const teamPos: TeamsPos = usePosition(tempData, curTime); // usePosition(curTime);

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
      >
        <Grid item>
          <ButtonBase color="primary" onClick={e => handleScoreClick("score")}>
            <RecordScore rType={click} />
          </ButtonBase>
        </Grid>
        <Grid item>
          <ButtonBase onClick={e => handleSubClick("sub")}>
            <RecordSubstitution rType={click} />
          </ButtonBase>
        </Grid>
      </Grid>
      {click === "score" &&
        <Grid container justify="center">
          <Grid item xs={8}>
            <AddScore time={curTime} teamPos={teamPos} />
          </Grid>
        </Grid>}
      <Grid container spacing={1} className={classes.margin}>
        <Grid item xs={8}>
          <Board rType={click} teamPos={teamPos} curTime={curTime} />
        </Grid>
        <Grid item xs>
          <Bench rType={click} teamPos={teamPos} curTime={curTime} />
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
