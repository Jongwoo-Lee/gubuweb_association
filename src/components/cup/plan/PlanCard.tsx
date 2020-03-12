import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Grid, Input } from "@material-ui/core";
import { DatePickerDlg, ExitWithID, convertKoTime } from "./DatePickerDlg";
import { MakeSubGameBtn } from "./makeSubGameBtn";
import { SubGameInfo } from "../../../context/game/game";
import {
  convertGroupString,
  convertFinalString
} from "../../../context/cup/cupMatch";

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
  handleOnLocation: Function;
  handleOnClose: Function;
  handleOnSetGameUID: Function;
  gameInfo: SubGameInfo;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  handleOnLocation,
  handleOnClose,
  handleOnSetGameUID,
  gameInfo
}: PlanCardProps) => {
  const classes = useStyles();
  const [selectedID, setSelectedID] = useState(-1); //=> -1이면 no
  const location: string = gameInfo?.location ?? "";

  let kickOffTime: string = "";
  if (
    (gameInfo?.kickOffTime ?? false) &&
    typeof gameInfo?.kickOffTime !== "undefined"
  ) {
    console.log(`gameInfo - ${gameInfo}`);
    console.dir(gameInfo);
    kickOffTime = convertKoTime(gameInfo?.kickOffTime.toDate());
  }

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

  const homeAwayList = () => [
    "HOME",
    `이건 나중에`,
    "VS",
    `이것도 나중에`,
    "AWAY"
  ];
  const teamNameList = () => [
    `${gameInfo.team1}`,
    "",
    "",
    "",
    `${gameInfo.team2}`
  ];

  return (
    <div>
      <Card variant="outlined" className={classes.root}>
        <Grid container className={classes.card}>
          <Grid item xs={12} alignItems="flex-start">
            <Typography align="left" variant="h6" component="span">
              {gameInfo.group !== undefined
                ? `${convertGroupString(gameInfo.group)}조 - ${gameInfo.id +
                    1}경기`
                : convertFinalString(gameInfo.id)}
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
                  onClick={() => handlePopDlg(gameInfo.id)}
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
                  onChange={e => handleLocation(e, gameInfo.id)}
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
            {homeAwayList().map((item: string) => (
              <Typography
                align="center"
                variant="subtitle1"
                component="span"
                className={classes.fixWidth2}
              >
                {item}
              </Typography>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
            className={classes.cardItems}
          >
            {teamNameList().map((item: string) => (
              <Typography
                align="center"
                variant="subtitle1"
                component="span"
                className={classes.fixWidth2}
              >
                {item ?? ""}
              </Typography>
            ))}
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

            <MakeSubGameBtn
              subGameInfo={gameInfo}
              setGameUID={handleOnSetGameUID}
            />

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
