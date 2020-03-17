import { withStyles, Slider, makeStyles } from "@material-ui/core";
import React from "react";
import { CurTime } from "../../../../context/cup/cupRecord";
import { TempSubData } from "../../../../hooks/cups";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    background: "yellow"
  },
  thumb: {
    display: "flex",
    flexDirection: "row"
  },
  test: {
    display: "flex",
    flexDirection: "row",
    position: "absolute"
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
}

export const CustomSlider: React.FC<CustomSliderProps> = ({
  time,
  setTime,
  tempData
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
  const makeThumb = () => {
    tempData.map((data: TempSubData) => {
      if (data.Q === time.curQuarter) {
        console.log(
          `data.T  - ${data.T} - ${(data.T / 1000 / (60 * 45)) * 100}`
        );
        return (
          <div className={classes.thumb} style={{ marginLeft: `40%` }}>
            ㄱ
          </div>
        );
      } else {
        return <div>ㄹ</div>;
      }
    });
  };

  return (
    <div className={classes.root}>
      <div style={{ left: `0%` }}>1</div>
      <div style={{ marginLeft: `25%` }}>2</div>
      <div style={{ marginLeft: `100%` }}>3</div>
      <div style={{ marginLeft: `50%` }}>4</div>
      <div style={{ marginLeft: `50%` }}>5</div>
      <div className={classes.thumb}>
        <div style={{ position: "absolute", left: `0%` }}>1</div>
        <div style={{ position: "absolute", marginLeft: `25%` }}>2</div>
        <div style={{ position: "absolute", marginLeft: `100%` }}>3</div>
        <div style={{ position: "absolute", marginLeft: `50%` }}>4</div>
        <div style={{ position: "absolute", marginLeft: `50%` }}>5</div>
      </div>
      {makeThumb()}
      <div className={classes.thumb}>
        <div> </div>
        <PrettoSlider
          aria-label="pretto slider"
          defaultValue={0}
          value={time.curTime}
          max={60 * 45}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
