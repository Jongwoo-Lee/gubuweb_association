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
  Button,
  Input
} from "@material-ui/core";
import { convertString } from "../../../context/cup/cupMatch";
import { SubGameInfo, GroupSubGames } from "../../../context/cup/cup";
import { useTextInput } from "../../../hooks";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: "800px"
  },
  card: {
    display: "flex",
    flexDirection: "column",

    margin: "0px 0px 15px 0px"
  },
  cardTitle: {
    justifyContent: "center",
    margin: "10px"
  },
  paper: {
    textAlign: "center"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface PlanCardProps {
  // groups: GroupSubGames;
  group: number;
  subGames: Array<SubGameInfo>;
  round: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  // groups,
  group,
  subGames,
  round
}: PlanCardProps) => {
  const classes = useStyles();
  const [location, setLocation] = useState<Array<string>>(
    Array<string>(subGames.length).fill("")
  );

  const handleLocation = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    event.preventDefault();
    const newLocation: Array<string> = [...location];
    newLocation[id] = event.target.value;

    setLocation(newLocation);
  };

  return (
    <div>
      {subGames.map((value: SubGameInfo, index: number) => {
        return (
          <Card variant="outlined" key={index} className={classes.card}>
            <Grid container className={classes.cardTitle}>
              <Typography align="center" variant="h6" component="span">
                장소
              </Typography>
              <br />
              <Grid container spacing={3}>
                <Grid item xs className={classes.paper}>
                  <Typography
                    align="center"
                    variant="subtitle1"
                    component="span"
                  >{`${convertString(group)} - 1`}</Typography>
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                  <Input
                    name="location"
                    type="text"
                    id={`${index}`}
                    value={location[index]}
                    onChange={e => handleLocation(e, index)}
                    autoFocus
                    autoComplete="location"
                    aria-describedby="component-location"
                  />
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
                  >
                    {value.team1}
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.paper}>
                  <Typography align="center" variant="h6" component="span">
                    킥오프
                  </Typography>
                </Grid>
                <Grid item xs className={classes.paper}>
                  <Typography
                    align="center"
                    variant="subtitle1"
                    component="span"
                  >
                    {value.team2}
                  </Typography>
                </Grid>
              </Grid>
              <br />

              <Grid container className={classes.cardTitle}>
                <Button variant="contained">
                  {value.kickOffTime ?? "시간 설정"}
                </Button>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
  );
};
