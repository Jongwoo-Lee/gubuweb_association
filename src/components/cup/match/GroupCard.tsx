import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, IconButton, Grid } from "@material-ui/core";
import { convertString, GroupCardItem } from "./GroupCardItem";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 520,
    margin: "10px 10px"
  },
  cardTitle: {
    margin: "0px 10px"
  },
  item: {
    margin: "5px 20px"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface GroupCardProps {
  id: number;
  numOfTeams: number;
  group: number;
  onDelete: Function;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  numOfTeams,
  group,
  onDelete
}: GroupCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <Grid container className={classes.cardTitle}>
          <Grid item xs={4}>
            {/* Intentionally Empty */}
          </Grid>
          <Grid container item xs={4} justify="center" alignItems="center">
            <Typography align="center" variant="body1" component="span">
              {convertString(group)}조
            </Typography>
          </Grid>
          <Grid container item xs={4} justify="flex-end">
            <IconButton onClick={_ => onDelete(id)}>
              <Typography
                className={classes.item}
                align="center"
                variant="body1"
                component="span"
              >
                삭제
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
        {numOfTeams > 0 &&
          [...Array(numOfTeams).keys()].map(i => (
            <GroupCardItem key={i} group={group} iter={i}></GroupCardItem>
          ))}
      </Card>
    </div>
  );
};
