import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  }
});

export interface RecordScoreProps {}

export const RecordScore: React.FC<RecordScoreProps> = ({}: RecordScoreProps) => {
  return (
    <Typography color="textPrimary" variant="h4">
      득점
    </Typography>
  );
};
