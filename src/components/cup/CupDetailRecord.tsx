import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { RouteComponentProps } from "react-router-dom";

export interface CupDetailRecordProps {}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  cards: {
    display: "flex",
    marginTop: "40px",
    flexWrap: "wrap"
  }
});

interface MatchRecordParams {
  gameID: string;
  id: string;
  group: string;
}

export const CupDetailRecord: React.FC<RouteComponentProps<
  MatchRecordParams
>> = (props: RouteComponentProps<MatchRecordParams>) => {
  const classes = useStyles();

  const gameID: string = props.match.params.gameID;
  const id: string = props.match.params.id;
  const group: string = props.match.params.group;

  console.log(`gameID - ${gameID} id - ${id} group - ${group}`);

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.CUP_DETAIL_RECORD} />
      <div className={classes.cards}>{ROUTENAMES.CUP_DETAIL_RECORD}</div>
    </div>
  );
};
