import React, { useState } from "react";
import { Grid, makeStyles, Paper, ButtonBase } from "@material-ui/core";
import { RecordShow } from "../field/RecordShow";
import { useTeamPos, useSetTeamPos } from "../../../../context/cup/cupRecord";
import { Board } from "./Board";
import { Bench } from "./Bench";
import { RecordScore } from "../RecordScore";
import { RecordSubstitution } from "../RecordSubstitution";

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

  const handleScoreClick = (e: RecordType) => {
    console.log(`before - ${click} - ${e}`);
    if (click !== "score") {
      setClick(e);
    } else setClick("");

    console.log(`after - ${e}`);
  };

  const handleSubClick = (e: RecordType) => {
    console.log(`before - ${click} - ${e}`);

    if (click !== "sub") {
      setClick(e);
    } else setClick("");

    console.log(`after - ${e}`);
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
          <Board rType={click} />
          {/* <Paper variant="elevation" className={classes.paper}></Paper> */}
        </Grid>
        <Grid item xs>
          {/* <Paper variant="elevation" className={classes.ground}></Paper> */}
          {/* <Bench knightPosition={knightPos2} /> */}
          <Bench rType={click} />
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
