import {
  withStyles,
  Slider,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { convertTimeString } from "../../../hooks/cups";
import { CurTime } from "../../../context/cup/cupRecord";

const useStyles = makeStyles({
  margin: {
    margin: "20px 0px 0px 0px"
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
  gameTime: string; // seconds로
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  time,
  setTime,
  gameTime
}: CustomSliderProps) => {
  const classes = useStyles();
  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) {
      let newTime: CurTime = { curQuarter: time.curQuarter, curTime: value };
      setTime(newTime);
    }
  };

  return (
    <Grid container spacing={3} className={classes.margin}>
      <Grid item xs>
        <Typography color="textPrimary" variant="h4" align="center">
          {convertTimeString(time.curTime)}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <PrettoSlider
          aria-label="pretto slider"
          defaultValue={0}
          value={time.curTime}
          max={60 * 45}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs>
        <Typography color="textPrimary" variant="h4" align="center">
          {gameTime}
        </Typography>
      </Grid>
    </Grid>
  );
};
