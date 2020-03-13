import { makeStyles, Typography, Grid } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    marginTop: "15px"
  }
});

export interface RecordShowProps {}

export const RecordShow: React.FC<RecordShowProps> = ({}: RecordShowProps) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      spacing={10}
      alignItems="center"
      direction="row"
      justify="center"
    >
      <Grid item>
        <Typography color="textPrimary" variant="h4">
          등번호
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant="h4">
          포지션
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant="h4">
          출전 시간
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant="h4">
          득점
        </Typography>
      </Grid>
    </Grid>
  );
};
