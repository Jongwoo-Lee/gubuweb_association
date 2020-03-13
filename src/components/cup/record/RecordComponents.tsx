import { makeStyles, Grid, Typography } from "@material-ui/core";
import React from "react";
import { RecordScore } from "./RecordScore";
import { RecordSubstitution } from "./RecordSubstitution";
import { RecordField } from "./RecordField";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  }
});

export interface RealRecordProps {}

export const RecordComponents: React.FC<RealRecordProps> = ({}: RealRecordProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.root}
        spacing={10}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <Grid item>
          <RecordScore />
        </Grid>
        <Grid item>
          <RecordSubstitution />
        </Grid>
      </Grid>
      <RecordField />
    </div>
  );
};
