import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, IconButton, Grid, Collapse } from "@material-ui/core";
import { CupMatchInfo, PreDataStructure } from "../../../context/cup/cupMatch";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";
import { ExpandMore } from "@material-ui/icons";
import { useFinalTeams } from "../../../context/cup/cupMatch";
import { PlanFinal } from "../../../context/cup/cup";
import { GameInfoInput } from "./GameInfoInput";
import { PlanFinalCards } from "./PlanFinalCards";

const useStyles = makeStyles({
  root: {
    margin: "50px 0px 0px 0px",
    width: "80%"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}
);

export interface FinalProps {
  matchInfo: CupMatchInfo;
  planFinal: PlanFinal;
  setPlanFinal: React.Dispatch<React.SetStateAction<PlanFinal>>;
}

export const FinalPlan: React.FC<FinalProps> = ({
  matchInfo,
  planFinal,
  setPlanFinal
}: FinalProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CustomExPanel>
        <CustomExPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textPrimary" variant="h5">
            본선
          </Typography>
        </CustomExPanelSummary>
        <CustomExPanelDetails className={classes.card}>
          {matchInfo && (
            <GameInfoInput setPlan={setPlanFinal} plan={planFinal} />
          )}
          {matchInfo &&
            [...Array<number>(Math.log2(Number(matchInfo.f.round))).keys()]
              .reverse()
              .map((value: number) => {
                return (
                  <PlanFinalCards
                    cardId={value}
                    finalData={matchInfo.f}
                    setPlanFinal={setPlanFinal}
                    planFinal={planFinal}
                  />
                );
              })}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};
