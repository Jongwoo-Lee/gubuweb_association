import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { CupMatchInfo } from "../../../context/cup/cupMatch";
import { PlanPreliminaryCards } from "./PlanPreliminaryCards";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";
import { PlanPreliminary } from "../../../context/cup/cup";
import { GameInfoInput } from "./GameInfoInput";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "50px 0px 0px 0px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});
export interface PreliminaryProps {
  matchInfo: CupMatchInfo;
  planPre: PlanPreliminary;
  setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
}

export const PreliminaryPlan: React.FC<PreliminaryProps> = (
  props: PreliminaryProps
) => {
  const classes = useStyles();
  let matchInfo: CupMatchInfo = props.matchInfo;

  return (
    <div className={classes.root}>
      <CustomExPanel defaultExpanded={true}>
        <CustomExPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textPrimary" variant="h5">
            예선
          </Typography>
        </CustomExPanelSummary>
        <CustomExPanelDetails className={classes.card}>
          {matchInfo && (
            <GameInfoInput setPlan={props.setPlanPre} plan={props.planPre} />
          )}
          {matchInfo &&
            Object.keys(matchInfo.p).map((value: string, index: number) => {
              let group: number = Number(value);

              // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
              return matchInfo !== undefined ? (
                <PlanPreliminaryCards
                  group={group}
                  preliminaryData={matchInfo.p}
                  round={1}
                  key={index}
                  setPlanPre={props.setPlanPre}
                  planPre={props.planPre}
                />
              ) : (
                <div></div>
              );
            })}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};
