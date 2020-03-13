import React from "react";
import { Typography, Grid, makeStyles } from "@material-ui/core";

export interface RecordFieldProps {}
const useStyles = makeStyles({
  margin: {
    margin: "20px 0px 0px 0px"
  }
});

export const RecordField: React.FC<RecordFieldProps> = ({}: RecordFieldProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.margin}>
      <Grid item xs={9}>
        <Typography color="textPrimary" variant="h4" align="center">
          그라운드
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography color="textPrimary" variant="h4" align="center">
          선수 명단
        </Typography>
      </Grid>
    </Grid>
  );
};
