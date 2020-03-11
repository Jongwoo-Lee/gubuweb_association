import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";

export interface CupDetailRecordProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    cards: {
      display: "flex",
      marginTop: "40px",
      flexWrap: "wrap"
    }
  })
);

export const CupDetailRecord: React.SFC<CupDetailRecordProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP_DETAIL_RECORD} />
      <div className={classes.cards}>{ROUTENAMES.CUP_DETAIL_RECORD}</div>
    </div>
  );
};
