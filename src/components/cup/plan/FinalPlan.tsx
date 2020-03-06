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

const useStyles = makeStyles(() =>
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
  const [expanded, setExpanded] = useState(true);
  const final = useFinalTeams();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.dir(matchInfo);

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
          {/* matchInfo &&
              Object.keys(matchInfo.p).map((value: string, index: number) => {
                let group: number = Number(value);
  
                // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
                return matchInfo !== undefined ? (
                  <PlanPreliminaryCards
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
              })} */}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};
