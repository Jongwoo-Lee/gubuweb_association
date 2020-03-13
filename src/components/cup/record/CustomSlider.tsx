import {
  withStyles,
  Slider,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import React from "react";
import { useConvertTimeStr, convertTimeString } from "../../../hooks/cups";

export interface CupDetailPlanProps {}

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
  // seconds: number;
  curTime: string;
  gameTime: string; // seconds로
  handleChange: (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => void;
}

// export const CustomSlider: React.FC<CustomSliderProps> = ({}: CustomSliderProps) => {
export const CustomSlider: React.FC<CustomSliderProps> = ({
  curTime,
  gameTime,
  handleChange
}: CustomSliderProps) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.margin}>
      <Grid item xs>
        <Typography color="textPrimary" variant="h4" align="center">
          {curTime}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <PrettoSlider
          aria-label="pretto slider"
          defaultValue={0}
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
