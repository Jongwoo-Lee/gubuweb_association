import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  IconButton,
  Grid,
  Box,
  Collapse
} from "@material-ui/core";
import { convertString } from "../../../context/cup/cupMatch";
import { SubGameInfo, GroupSubGames } from "../../../context/cup/cup";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",

    margin: "10px 10px"
  },
  cardTitle: {
    margin: "0px 10px"
  },
  item: {
    margin: "5px 20px"
  },
  gridBox: {
    display: "flex",
    flexDirection: "row"
  },

  box: {
    width: "5px",
    height: "80%",
    backgroundColor: "red",
    color: "red",
    margin: "0px 3px 0px 0px"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface PlanCardProps {
  groups: GroupSubGames;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  groups
}: PlanCardProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {Object.keys(groups).map((value: string) => {
        let group: number = Number(value);

        return (
          <Collapse in={true} timeout="auto" unmountOnExit>
            {groups[group].map((value: SubGameInfo) => {
              return (
                <Card variant="outlined">
                  <Box borderBottom={1}>
                    <Grid container className={classes.cardTitle}>
                      <Typography
                        align="center"
                        variant="body1"
                        component="span"
                      >
                        {convertString(group)}조
                      </Typography>
                    </Grid>
                  </Box>
                </Card>
              );
            })}
          </Collapse>
        );
      })}
    </div>
  );
};
