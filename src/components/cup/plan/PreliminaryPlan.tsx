import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { CupMatchInfo, PreDataStructure } from "../../../context/cup/cupMatch";
import { PlanPreliminaryCard } from "./PlanPreliminaryCard";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";
import { PlanPreliminary } from "../../../context/cup/cup";
import { GameInfoInput } from "./GameInfoInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      margin: "50px 0px 0px 0px",
      width: "80%"
    },
    card: {
      display: "flex",
      flexDirection: "column",
      width: "800px", // expansionPanel width가 변하는 것 -> flex Grow와 관게 있는 듯 찾아봐서 고정시킬 것..
      alignItems: "center"
    }
  })
);
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
      <CustomExPanel>
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
                <PlanPreliminaryCard
                  group={group}
                  // preliminaryData={preData.groups[group]}
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
