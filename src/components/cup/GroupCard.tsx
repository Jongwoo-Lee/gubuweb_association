import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 520,
    margin: "10px 10px" // top right bottom left
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    justifyContent: "space-between",
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
          {convertString(group)}조
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
        {convertString(group)}조 {iter + 1}
      </Typography>
      <IconButton>
        <Typography
          className={classes.item}
          align="center"
          variant="body1"
          component="span"
        >
          + 팀 추가
        </Typography>
      </IconButton>
    </div>
  );
};

const convertString = (num: number): string => {
  let cStr: string = "";
  switch (num) {
    case 0:
      cStr = "A";
      break;
    case 1:
      cStr = "B";
      break;
    case 2:
      cStr = "C";
      break;
    case 3:
      cStr = "D";
      break;
    case 4:
      cStr = "E";
      break;
    case 5:
      cStr = "F";
      break;
    case 6:
      cStr = "G";
      break;
    case 7:
      cStr = "H";
      break;
    case 8:
      cStr = "I";
      break;
    case 9:
      cStr = "J";
      break;
    case 10:
      cStr = "K";
      break;
    case 11:
      cStr = "L";
      break;
    case 12:
      cStr = "M";
      break;
    case 13:
      cStr = "N";
      break;
  }

  return cStr;
};
