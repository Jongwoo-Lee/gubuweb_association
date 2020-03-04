import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
      margin: "50px 0px 0px 0px"
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    line: {
      color: "black",
      backgroundColor: "black",
      borderColor: "black",
      height: 1,
      width: "100%"
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
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  let groups: GroupSubGames | undefined;
  if (props.matchInfo) groups = initializeGroup(props.matchInfo);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography color="textPrimary" variant="h5">
          예선
        </Typography>
        <IconButton
          className={expanded ? classes.expandOpen : classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </Grid>
      <br />
      <hr className={classes.line} />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {groups && <PlanCard groups={groups} />}
      </Collapse>
    </div>
  );
};

const initializeGroup = (matchInfo: CupMatchInfo): GroupSubGames => {
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
  console.dir(preliminaryGroup);

  return preliminaryGroup;
};
