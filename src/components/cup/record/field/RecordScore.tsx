import { Typography, Paper } from "@material-ui/core";
import React from "react";
import { RecordType } from "../../../../hooks/cups";

export interface RecordScoreProps {
  rType?: RecordType;
}

export const RecordScore: React.FC<RecordScoreProps> = ({
  rType
}: RecordScoreProps) => {
  const value = rType === "score" ? "green" : undefined;
  return (
    <Paper
      style={{
        padding: "20px",
        background: value
      }}
    >
      <Typography color="textPrimary" variant="h4">
        득점
      </Typography>
    </Paper>
  );
};
