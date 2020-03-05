import React, { useState } from "react";
import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Grid,
  Collapse,
} from "@material-ui/core";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { ExpandMore } from "@material-ui/icons";
import { CupMatchInfo, PreDataStructure } from "../../../context/cup/cupMatch";
import { GroupSubGames, SubGameInfo } from "../../../context/cup/cup";
import { PlanCard } from "./PlanCard";

const ExpansionPanel = withStyles({
  root: {
    border: 'none',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);
const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // alignItems: "start",
      margin: "50px 0px 0px 0px",
      // alignContent: "start",

      width: "80%",
    },
    // -webkit-box-shadow: none;
    // -moz-box-shadow: none;
    // box-shadow: none;
    line: {
      justifyContent: "center",
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
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"

        >
          <Typography color="textPrimary" variant="h5">예선</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.line}>
          {preData &&
            <PlanCard groups={preData.groups} round={preData.round} />}
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
