import React, { useState, useEffect } from "react";
import { Typography, Grid, makeStyles, Paper } from "@material-ui/core";
import { RecordShow } from "./RecordShow";
import { observe } from "./Game";
import Board from "./Board";
import { Bench } from "./Bench";
import { useTeamPos, useSetTeamPos } from "../../../../context/cup/cupRecord";

export interface RecordFieldProps {}
const useStyles = makeStyles({
  margin: {
    marginTop: "20px",
    height: "700px"
  },
  ground: {
    background: "white",
    height: "100%"
  },
  paper: {
    background: "green",
    height: "100%"
  }
});

export const RecordField: React.FC<RecordFieldProps> = ({}: RecordFieldProps) => {
  const classes = useStyles();
  const pos = useTeamPos();
  const setPos = useSetTeamPos();

  useEffect(() =>
    observe(pos, (newPos: { [pos: number]: string }) => setPos(newPos))
  );

  return (
    <div>
      <Grid container spacing={1} className={classes.margin}>
        <Grid item xs={9}>
          <Board />
          {/* <Paper variant="elevation" className={classes.paper}></Paper> */}
        </Grid>
        <Grid item xs>
          <Paper variant="elevation" className={classes.ground}></Paper>
          {/* <Bench knightPosition={knightPos2} /> */}
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
