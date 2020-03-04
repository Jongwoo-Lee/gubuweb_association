import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  IconButton,
  Grid,
  Box,
  Collapse,
  CardActionArea,
  Paper,
  Button
} from "@material-ui/core";
import { convertString } from "../../../context/cup/cupMatch";
import { SubGameInfo, GroupSubGames } from "../../../context/cup/cup";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",

    minWidth: "700px",
    margin: "10px 10px"
  },
  cardTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50px",
    alignContent: "center",
    margin: "10px"
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
  },
  line: {
    color: "black",
    backgroundColor: "black",
    borderColor: "black",
    height: 1,
    width: "100%"
  },

  paper: {
    textAlign: 'center',
  },
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface PlanCardProps {
  groups: GroupSubGames;
  round: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  groups,
  round
}: PlanCardProps) => {
  const classes = useStyles();

  const [keyList, setKeyList] = useState<Array<number>>([]);

  const handleCollapse = (key: number) => {
    const newKeyList: Array<number> = [...keyList];
    const fIdx: number = newKeyList.findIndex((i) => key == i);
    if (fIdx !== -1) {
      newKeyList.splice(fIdx, 1);
    } else {
      newKeyList.push(key);
    }

    console.log(`newKeyList - ${newKeyList}`)
    setKeyList(newKeyList);
  };



  return (
    <div className={classes.root}>
      {Object.keys(groups).map((value: string, index: number) => {
        let group: number = Number(value);

        return (
          <div key={index}>
            <Card variant="outlined" >
              <CardActionArea onClick={e => handleCollapse(index)}>
                <Grid container className={classes.cardTitle} >

                  <Typography
                    align="center"
                    variant="h5"
                    component="span"
                  >
                    {convertString(group)}조
              </Typography>
                </Grid>
              </CardActionArea>
            </Card>
            <Collapse in={(keyList.findIndex((i) => index == i) !== -1)} timeout="auto" unmountOnExit>
              {groups[group].map((value: SubGameInfo) => {
                return (
                  <Card variant="outlined">
                    <Grid container className={classes.cardTitle} >

                      <Typography
                        align="center"
                        variant="h6"
                        component="span"

                      >
                        장소
                      </Typography>
                      <br></br>
                      <Grid container spacing={3}>
                        <Grid item xs className={classes.paper}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            component="span"

                          >{`${convertString(group)} - 1`}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            component="span"

                          >우리집</Typography>
                        </Grid>
                        <Grid item xs className={classes.paper}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            component="span"

                          >{`${convertString(group)} - 2`}</Typography>
                        </Grid>
                      </Grid>
                      <br />
                      <Grid container spacing={3}>
                        <Grid item xs className={classes.paper}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            component="span"

                          >{value.team1}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.paper}>
                          <Typography
                            align="center"
                            variant="h6"
                            component="span"

                          >킥오프</Typography>
                        </Grid>
                        <Grid item xs className={classes.paper}>
                          <Typography
                            align="center"
                            variant="subtitle1"
                            component="span"

                          >{value.team2}</Typography>
                        </Grid>
                      </Grid>
                      <br />

                      <Grid container className={classes.cardTitle} >


                        <Button variant="contained">
                          시간 설정
        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};
