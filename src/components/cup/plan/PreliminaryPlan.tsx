import React from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles
} from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Grid,
  Collapse
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { CupMatchInfo, PreDataStructure } from "../../../context/cup/cupMatch";
import { GroupSubGames, SubGameInfo } from "../../../context/cup/cup";
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
      width: "80%",
      minWidth: "50%"
    },
    card: {
      display: "flex",
      flexDirection: "column",

      minWidth: "800px"
    }
  })
);
interface PreData {
  groups: GroupSubGames;
  round: number;
}

export interface PreliminaryProps {
  matchInfo: CupMatchInfo;
}

export const PreliminaryPlan: React.FC<PreliminaryProps> = (
  props: PreliminaryProps
) => {
  const classes = useStyles();
  let preData: PreData | undefined;
  if (props.matchInfo) preData = initializeGroup(props.matchInfo);

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
          {preData &&
            Object.keys(preData.groups).map((value: string, index: number) => {
              let group: number = Number(value);

              // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
              return preData !== undefined ? (
                <PlanCard
                  group={group}
                  subGames={preData.groups[group]}
                  round={preData.round}
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

const initializeGroup = (matchInfo: CupMatchInfo): PreData => {
  const preliminaryMatch: PreDataStructure = matchInfo.p;
  const preliminaryGroup: GroupSubGames = {};

  Object.keys(preliminaryMatch).forEach((value: string) => {
    let group: number = Number(value);
    const numOfTeams = preliminaryMatch[group].t; // group에 참여한 팀 수
    const arr: Array<SubGameInfo> = [];
    for (let i = 0; i < numOfTeams - 1; i++) {
      for (let j = i + 1; j < numOfTeams; j++) {
        arr.push({
          team1: preliminaryMatch[group][i] ?? null,
          team2: preliminaryMatch[group][j] ?? null
        });
      }
    }
    preliminaryGroup[group] = arr;
  });

  return { groups: preliminaryGroup, round: matchInfo.ro };
};
