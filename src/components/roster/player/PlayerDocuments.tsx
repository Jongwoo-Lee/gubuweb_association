import React from "react";
import { Typography } from "@material-ui/core";
import { SizedBox } from "../../common/SizedBox";

export interface PlayerDocumentsProps {}

export const PlayerDocuments: React.FC<PlayerDocumentsProps> = () => {
  return (
    <div>
      <Typography variant="h6">제출 서류</Typography>
      <SizedBox height="20px" />
    </div>
  );
};
