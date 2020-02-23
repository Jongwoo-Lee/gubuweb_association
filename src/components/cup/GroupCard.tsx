import React, { MouseEventHandler, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  Button,
  IconButton
} from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Team } from "../../helpers/Firebase/team";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    minWidth: 150
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "space-between",
    width: 400,
    minWidth: 150
  },
  items: {
    display: "flex",
    flexDirection: "row",
    width: 400,
    alignItems: "center",
    justifyContent: "space-between"
  },
  item: {
    margin: "5px 20px"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface GroupCardProps {
  numOfTeams: number;
  group: number;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  numOfTeams,
  group
}: GroupCardProps) => {
  const classes = useStyles();
  const items: JSX.Element[] = Array<JSX.Element>();
  for (let i = 0; i < numOfTeams; i++)
    items.push(<GroupCardItem key={i} group={group} iter={i}></GroupCardItem>);

  return (
    <div className={classes.root}>
      <Card className={classes.card} variant="outlined">
        <Typography
          className={classes.item}
          align="center"
          variant="body1"
          component="span"
        >
          {group}조
        </Typography>
        {items.length > 0 && items.map(item => item)}
      </Card>
    </div>
  );
};

interface GroupCardItemProps {
  group: number;
  iter: number;
}

const GroupCardItem: React.FC<GroupCardItemProps> = ({
  group,
  iter
}: GroupCardItemProps) => {
  const classes = useStyles();

  return (
    <div className={classes.items}>
      <Typography
        className={classes.item}
        align="center"
        variant="body1"
        component="span"
      >
        {group}조 {iter}
      </Typography>
      <Typography
        className={classes.item}
        align="center"
        variant="body1"
        component="span"
      >
        <IconButton>+ 팀 추가</IconButton>
      </Typography>
    </div>
  );
};
