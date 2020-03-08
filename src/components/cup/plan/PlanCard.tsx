import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, Button, Input } from "@material-ui/core";
import { DatePickerDlg, ExitWithID } from "./DatePickerDlg";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px"
  },
  card: {
    justifyContent: "center",
    margin: "10px 0px 10px 0px"
  },
  paper: {
    textAlign: "center"
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    margin: "10px"
  }
});

export interface PlanCardProps {
  id: number;
  team1Group?: string;
  team2Group?: string;
  team1UID: string | null;
  team2UID: string | null;
  location: string;
  kickOffTime: string;
  handleOnLocation: Function;
  handleOnClose: Function;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  id,
  team1Group,
  team2Group,
  team1UID,
  team2UID,
  location,
  kickOffTime,
  handleOnLocation,
  handleOnClose
}: PlanCardProps) => {
  const classes = useStyles();
  const [selectedID, setSelectedID] = useState(-1); //=> -1이면 no

  const handleClose = (obj: ExitWithID) => {
    handleOnClose(obj);
    setSelectedID(-1);
  };

  const handlePopDlg = (id: number) => {
    setSelectedID(id);
  };

  const handleLocation = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    event.preventDefault();
    handleOnLocation(event.target.value, id);
  };

  return (
    <Card variant="outlined" className={classes.root}>
      <Grid container className={classes.card}>
        <Typography align="center" variant="h6" component="span">
          장소
        </Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs className={classes.paper}>
            <Typography align="center" variant="subtitle1" component="span">
              {team1Group}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.paper}>
            <Input
              name="location"
              type="text"
              id={`${team1Group} - ${team2Group}`}
              value={location}
              onChange={e => handleLocation(e, id)}
              autoFocus
              autoComplete="location"
              aria-describedby="component-location"
            />
          </Grid>
          <Grid item xs className={classes.paper}>
            <Typography align="center" variant="subtitle1" component="span">
              {team2Group}
            </Typography>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={3}>
          <Grid item xs className={classes.paper}>
            <Typography align="center" variant="subtitle1" component="span">
              {team1UID}
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.paper}>
            <Typography align="center" variant="h6" component="span">
              킥오프
            </Typography>
          </Grid>
          <Grid item xs className={classes.paper}>
            <Typography align="center" variant="subtitle1" component="span">
              {team2UID}
            </Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.card}>
          <Button variant="contained" onClick={() => handlePopDlg(id)}>
            {kickOffTime}
          </Button>
        </Grid>
      </Grid>
      <DatePickerDlg
        title={"예선 시간 선택"}
        parentID={selectedID}
        onClose={handleClose}
      />
    </Card>
  );
};
