import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

export interface RecordSubstitutionProps {}

export const RecordSubstitution: React.FC<RecordSubstitutionProps> = ({}: RecordSubstitutionProps) => {
  return (
    <Typography color="textPrimary" variant="h4">
      선발/교체
    </Typography>
  );
};
