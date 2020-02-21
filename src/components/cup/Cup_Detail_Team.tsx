import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";

export interface CupDetailTeamProps {}

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

export const CupDetailTeam: React.SFC<CupDetailTeamProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP_DETAIL_TEAM} />
      <div className={classes.cards}>{ROUTENAMES.CUP_DETAIL_TEAM}</div>
    </div>
  );
};
