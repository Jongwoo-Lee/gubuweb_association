import React, { useState } from "react";
import { Player } from "./Player";
import {
  Box,
  makeStyles,
  Card,
  CardContent,
  Typography,
  ButtonBase,
  Grid
} from "@material-ui/core";
import { RecordType } from "./RecordField";
import {
  CurTime,
  useSelUsr,
  makeQuarterString
} from "../../../../context/cup/cupRecord";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { convertTimeString } from "../../../../hooks/cups";
import Trophy from "../../../../images/trophy_on.svg";

export interface AddScoreProps {
  time: CurTime;
  teamPos: TeamsPos;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "20px",
    padding: "15px",
    justifyContent: "space-between"
  },
  col: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center"
  },
  center: {
    alignSelf: "center"
  }
});

export const AddScore: React.FC<AddScoreProps> = ({
  time,
  teamPos
}: AddScoreProps) => {
  const classes = useStyles();
  const sel: number = useSelUsr();
  const [scorers, setScorers] = useState<Array<string>>(Array<string>(2));

  const notEnter = () => (
    <div className={classes.row}>
      <div className={classes.center}>
        <img width="30" src={Trophy} alt={"팀원"} />
      </div>
      <Typography className={classes.center}>미입력</Typography>
    </div>
  );

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent className={classes.col}>
        <Typography align="center">득점</Typography>
        <Typography>{convertTimeString(time.curTime)}</Typography>
        <ButtonBase>
          {" "}
          <Typography>취소</Typography>
        </ButtonBase>
      </CardContent>
      <CardContent className={classes.row}>
        {/* <Grid container direction="row" alignItems="center"> */}
        {/* <Grid item> */}
        <Typography className={classes.center}>골:</Typography>
        {/* </Grid> */}
        {scorers[0] !== undefined ? "입력" : notEnter()}
        {/* </Grid> */}
      </CardContent>
      <CardContent className={classes.col}>
        <Typography align="center">득점</Typography>
        <Typography>{convertTimeString(time.curTime)}</Typography>
        <ButtonBase>
          {" "}
          <Typography>취소</Typography>
        </ButtonBase>
      </CardContent>
      <CardContent className={classes.col}>
        <Typography align="center">득점</Typography>
        <Typography>{convertTimeString(time.curTime)}</Typography>
        <ButtonBase>
          {" "}
          <Typography>취소</Typography>
        </ButtonBase>
      </CardContent>
    </Card>
  );
};
