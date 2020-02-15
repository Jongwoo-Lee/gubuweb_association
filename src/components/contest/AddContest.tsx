import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoback } from "../common/TitleGoBack";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    }
  });
});

export interface AddContestProps {}

export const AddContest: React.SFC<AddContestProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoback title="대회 추가" />
    </div>
  );
};
