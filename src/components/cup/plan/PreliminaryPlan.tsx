import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { CupMatchInfo, PreDataStructure } from "../../../context/cup/cupMatch";
import { PlanCard } from "./PlanCard";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";

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
      width: "800px" // expansionPanel width가 변하는 것 -> flex Grow와 관게 있는 듯 찾아봐서 고정시킬 것..
      // flexGrow: 1
    }
  })
);
export interface PreliminaryProps {
  matchInfo: CupMatchInfo;
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
          {matchInfo &&
            Object.keys(matchInfo.p).map((value: string, index: number) => {
              let group: number = Number(value);

              // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
              return matchInfo !== undefined ? (
                <PlanCard
                  group={group}
                  // preliminaryData={preData.groups[group]}
                  preliminaryData={matchInfo.p}
                  round={1}
                  key={index}
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
