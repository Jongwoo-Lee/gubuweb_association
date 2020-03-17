import { withStyles, Slider, makeStyles, Button, ButtonBase } from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
import { CurTime } from "../../../../context/cup/cupRecord";
import { TempSubData } from "../../../../hooks/cups";
import ImportExportIcon from '@material-ui/icons/ImportExport';
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  thumb: {
    display: "flex",
    flexDirection: "row",

  },
  test: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  margin: {
    margin: "10"
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
  // const targetRef = useRef<any>();
  // const [dimensions, setDimensions] = useState({ width: 0 });
  // useEffect(() => {
  //   if (targetRef.current) {
  //     setDimensions({
  //       width: targetRef.current.offsetWidth,
  //     });
  //     console.log(`${dimensions.width}`)
  //   }
  // }, []);


  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) {
      let newTime: CurTime = { curQuarter: time.curQuarter, curTime: value };
      setTime(newTime);
    }
  };

  const handleClick = (data: TempSubData) => {
    let newTime: CurTime = { curQuarter: data.Q, curTime: data.T / 1000 };

    setTime(newTime)
  }


  return (
    <div className={classes.root}>
      <div className={classes.test}>
        {
          tempData.map((data: TempSubData) => {
            const lMargin: string = (((data.T / 1000) / (45 * 60)) * 100).toPrecision(2).toString();
            if (data.Q === time.curQuarter) {
              console.log(lMargin)
              return (
                <div style={{ position: "absolute", marginLeft: lMargin, left: "-12px" }}>
                  <ButtonBase onClick={e => handleClick(data)}> <ImportExportIcon /></ButtonBase></div>
              );
            } else {
              return <div></div>;
            }
          })
        }
      </div>
      <div className={classes.margin}> </div>
      <br />
      <PrettoSlider
        aria-label="pretto slider"
        defaultValue={0}
        value={time.curTime}
        max={60 * 45}
        onChange={handleChange}
      />
    </div>
  );
};
