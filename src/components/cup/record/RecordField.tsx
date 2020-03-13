import React from "react";
import { Typography, Grid, makeStyles, Paper } from "@material-ui/core";
import { RecordShow } from "./RecordShow";

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
  return (
    <div>
      <Grid container spacing={1} className={classes.margin}>
        <Grid item xs={9}>
          <Paper variant="elevation" className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper variant="elevation" className={classes.ground}></Paper>
        </Grid>
      </Grid>

      <RecordShow />
    </div>
  );
};
