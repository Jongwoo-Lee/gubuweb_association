import React, { useState } from "react";
import { Grid, makeStyles, ButtonBase } from "@material-ui/core";
import { RecordShow } from "../field/RecordShow";
import { Board } from "./Board";
import { Bench } from "./Bench";
import { RecordScore } from "../RecordScore";
import { RecordSubstitution } from "../RecordSubstitution";
import { usePosition } from "../../../../hooks/cups";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { useRecordTime, CurTime } from "../../../../context/cup/cupRecord";

export interface RecordFieldProps {}
const useStyles = makeStyles({
  margin: {
    marginTop: "20px",
    height: "700px"
  }
});

export type RecordType = "score" | "sub" | "";

export const RecordField: React.FC<RecordFieldProps> = ({}: RecordFieldProps) => {
  const classes = useStyles();
  const [click, setClick] = useState<RecordType>(""); //useRecordType(); // useState<RecordType>("");

  const curTime: CurTime = useRecordTime();
  const teamPos: TeamsPos = usePosition(curTime);

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

      <Grid container spacing={1} className={classes.margin}>
        <Grid item xs={8}>
          <Board rType={click} teamPos={teamPos} />
          {/* <Paper variant="elevation" className={classes.paper}></Paper> */}
        </Grid>
        <Grid item xs>
          {/* <Paper variant="elevation" className={classes.ground}></Paper> */}
          {/* <Bench knightPosition={knightPos2} /> */}
          <Bench rType={click} teamPos={teamPos} />
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
