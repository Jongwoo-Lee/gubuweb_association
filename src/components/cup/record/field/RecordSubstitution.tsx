import { makeStyles, Typography, Paper } from "@material-ui/core";
import React from "react";
import { RecordType } from "../../../../hooks/cups";

export interface RecordSubstitutionProps {
  rType?: RecordType;
}

export const RecordSubstitution: React.FC<RecordSubstitutionProps> = ({
  rType
}: RecordSubstitutionProps) => {
  const value = rType === "sub" ? "green" : undefined;
  return (
    <Paper
      style={{
        padding: "20px",
        background: value
      }}
    >
      <Typography color="textPrimary" variant="h4">
        선발/교체
      </Typography>
    </Paper>
  );
};
