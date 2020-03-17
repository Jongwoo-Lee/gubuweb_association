import {
  withStyles,
  Slider,
  Grid,
  Typography,
  makeStyles,
  Icon
} from "@material-ui/core";
import React from "react";
import { convertTimeString, TempSubData } from "../../../../hooks/cups";
import { CurTime } from "../../../../context/cup/cupRecord";
import { CustomSlider } from "./CustomSlider";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  margin: {
    margin: 0
  }
});

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export interface CustomSliderProps {
  time: CurTime;
  setTime: React.Dispatch<React.SetStateAction<CurTime>>;
  tempData: Array<TempSubData>;
  gameTime: string; // seconds로
}

export const CustomSliderComponent: React.FC<CustomSliderProps> = ({
  time,
  setTime,
  tempData,
  gameTime
}: CustomSliderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.margin}>
        <Grid item xs>
          <Typography color="textPrimary" variant="h4" align="center">
            {convertTimeString(time.curTime)}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <CustomSlider time={time} setTime={setTime} tempData={tempData} />
        </Grid>
        <Grid item xs>
          <Typography color="textPrimary" variant="h4" align="center">
            {gameTime}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
