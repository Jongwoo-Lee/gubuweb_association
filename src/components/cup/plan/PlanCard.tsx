import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, Input } from "@material-ui/core";
import { DatePickerDlg, ExitWithID } from "./DatePickerDlg";
import { MakeSubGameBtn } from "./makeSubGameBtn";

const useStyles = makeStyles({
  root: {
    margin: "15px 0px 15px 0px"
  },
  card: {
    padding: "30px 30px 30px 30px",
    minWidth: "600px"
  },
  cardItems: {
    margin: "10px"
  },
  textField: {
    minWidth: "300px"
  },
  fixWidth: {
    minWidth: "120px"
  },
  fixWidth2: {
    minWidth: "100px"
  }
});

export interface PlanCardProps {
  id: number;
  title: string;
  team1Group?: string;
  team2Group?: string;
  team1UID: string | null;
  team2UID: string | null;
  location: string;
  kickOffTime: string;
  handleOnLocation: Function;
  handleOnClose: Function;
  group?: number;
  round: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  id,
  title,
  team1Group,
  team2Group,
  team1UID,
  team2UID,
  location,
  kickOffTime,
  handleOnLocation,
  handleOnClose,
  group,
  round
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
    <div>
      <Card variant="outlined" className={classes.root}>
        <Grid container className={classes.card}>
          <Grid item xs={12} alignItems="flex-start">
            <Typography align="left" variant="h6" component="span">
              {title}
            </Typography>
          </Grid>
          <br />

          <Grid item xs={12} className={classes.cardItems}>
            <Grid container justify="center" spacing={5}>
              <Grid item className={classes.fixWidth}>
                <Typography variant="subtitle1" component="span">
                  경기 시간
                </Typography>
              </Grid>
              <Grid item>
                <Input
                  className={classes.textField}
                  onClick={() => handlePopDlg(id)}
                  disabled
                  name="selTime"
                  type="text"
                  id={`time`}
                  value={kickOffTime}
                  aria-describedby="component-selTime"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.cardItems}>
            <Grid container justify="center" spacing={5}>
              <Grid item className={classes.fixWidth}>
                <Typography variant="subtitle1" component="span">
                  장소
                </Typography>
              </Grid>
              <Grid item>
                <Input
                  className={classes.textField}
                  name="location"
                  type="text"
                  id={`location`}
                  value={location}
                  onChange={e => handleLocation(e, id)}
                  aria-describedby="component-location"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            className={classes.cardItems}
          >
            <Typography
              align="center"
              variant="subtitle1"
              component="span"
              className={classes.fixWidth2}
            >
              Home
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className={classes.fixWidth2}
            >
              {team1Group}
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className={classes.fixWidth2}
            >
              VS
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className={classes.fixWidth2}
            >
              {team2Group}
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              className={classes.fixWidth2}
            >
              Away
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            className={classes.cardItems}
          >
            <Typography
              align="center"
              variant="subtitle1"
              component="span"
              className={classes.fixWidth2}
            >
              {team1UID}
            </Typography>
            <Typography className={classes.fixWidth2} />
            <Typography className={classes.fixWidth2} />
            <Typography className={classes.fixWidth2} />
            <Typography
              align="center"
              variant="subtitle1"
              component="span"
              className={classes.fixWidth2}
            >
              {team2UID}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            className={classes.cardItems}
          >
            <Typography
              align="center"
              variant="subtitle1"
              component="span"
              className={classes.fixWidth2}
            >
              0
            </Typography>
            <Typography className={classes.fixWidth2} />

            <MakeSubGameBtn group={group} round={round} />

            <Typography className={classes.fixWidth2} />
            <Typography
              align="center"
              variant="subtitle1"
              component="span"
              className={classes.fixWidth2}
            >
              0
            </Typography>
          </Grid>
        </Grid>
        <DatePickerDlg
          title={"예선 시간 선택"}
          parentID={selectedID}
          onClose={handleClose}
        />
      </Card>
    </div>
  );
};
