import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, IconButton, Grid } from "@material-ui/core";
import { convertString, GroupCardItem } from "./GroupCardItem";
import {
  PreDataStructure,
  usePreTeams,
  useSetPreTeams
} from "../../../context/cup/cupMatch";

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
  const pTeams: PreDataStructure = usePreTeams();
  const setPTeams = useSetPreTeams();

  const handleClose = (value: number) => {
    let newPTeams: PreDataStructure = JSON.parse(JSON.stringify(pTeams));
    if (newPTeams[group]) {
      // 중간에 있는 group은 앞으로 당겨져야 한다.
      const length: number = Object.keys(newPTeams).length;
      for (let i = group; i < length; i++) {
        if (newPTeams[i + 1]) newPTeams[i] = newPTeams[i + 1];
        else delete newPTeams[i];
      }
    }
    setPTeams(newPTeams);
    onDelete(value);
  };

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
            <IconButton onClick={_ => handleClose(id)}>
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
