import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import {
  CupMatchInfo,
  convertFinalCardString
} from "../../../context/cup/cupMatch";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";
import { ExpandMore } from "@material-ui/icons";
import {
  PlanFinal,
  usePlanFinal,
  useSetPlanFinal,
  useMatchInfo
} from "../../../context/cup/cupPlan";
import { GameInfoInput } from "./GameInfoInput";
import { PlanFinalCards } from "./PlanFinalCards";

const useStyles = makeStyles({
  root: {
    margin: "50px 0px 0px 0px",
    width: "80%"
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  btn: {
    margin: "0px 10px 0px 10px"
  }
});

export interface FinalProps {}

export const FinalPlan: React.FC<FinalProps> = () => {
  const classes = useStyles();
  const planFinal = usePlanFinal();
  const setPlanFinal = useSetPlanFinal();
  let matchInfo: CupMatchInfo = useMatchInfo();
  const arr: Array<number> = readyArray(matchInfo);

  const [expandedID, setExpandedID] = useState<number>(-1);

  const handleChange = (e: number) => {
    if (expandedID === -1) setExpandedID(e);
    else {
      if (expandedID === e) {
        setExpandedID(-1);
      } else {
        setExpandedID(e);
      }
    }
  };

  return (
    <div className={classes.root}>
      <CustomExPanel defaultExpanded={true}>
        <CustomExPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textPrimary" variant="h5">
            본선
          </Typography>
        </CustomExPanelSummary>
        <CustomExPanelDetails className={classes.detail}>
          {matchInfo && (
            <GameInfoInput
              setPlan={setPlanFinal}
              plan={planFinal}
              isFinal={true}
            />
          )}
          <div>
            {matchInfo &&
              arr.reverse().map((value: number) => {
                return (
                  <Button
                    variant="contained"
                    color={expandedID === value ? "primary" : undefined}
                    className={classes.btn}
                    onClick={e => handleChange(value)}
                  >
                    {convertFinalCardString(Math.pow(2, value), true)}
                  </Button>
                );
              })}
          </div>
          {expandedID !== -1 && (
            <PlanFinalCards
              cardId={expandedID}
              setPlanFinal={setPlanFinal}
              planFinal={planFinal}
            />
          )}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};

const readyArray = (matchInfo: CupMatchInfo): Array<number> => {
  const arr: Array<number> = [
    ...Array<number>(Math.log2(Number(matchInfo.f.round)) + 1).keys()
  ];

  // 결승전, 3,4위전 switch
  arr[0] = 1;
  arr[1] = 0;

  return arr;
};
