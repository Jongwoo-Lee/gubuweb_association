import React from "react";
import { makeStyles } from "@material-ui/core";

export interface FieldProps {}

const useStyles = makeStyles({
  container: {
    width: "120em",
    height: "80em",
    backgroundColor: "green",
    fontSize: "5px",
    padding: "0"
  },
  field: {
    width: "inherit",
    height: "inherit",
    border: "0.3em solid white",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    display: "block"
  },
  halfwayLine: {
    width: "calc(120em / 2)",
    height: "80em",
    border: "0.3em solid white",
    display: "block"
  },
  centerCircle: {
    width: "20em",
    height: "20em",
    border: "0.3em solid white",
    borderRadius: "50%",
    position: "absolute",
    top: "calc((80em - 20em) / 2)",
    left: "calc((120em - 20em - 0.3em) / 2)",
    display: "block"
  },
  mark: {
    width: "2em",
    height: "2em",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "calc(80em / 2 - 1em)",
    display: "block"
  },
  penaltyArea: {
    width: "18em",
    height: "44em",
    border: "0.3em solid white",
    position: "absolute",
    top: "calc((80em - 44em) / 2)",
    left: "-0.3em",
    backgroundColor: "green",
    display: "block"
  },
  penaltyArc: {
    width: "20em",
    height: "20em",
    border: "0.3em solid white",
    borderRadius: "50%",
    position: "absolute",
    top: "calc((80em - 20em) / 2)",
    zIndex: -1
  },
  goalArea: {
    width: "6em",
    height: "20em",
    border: "0.3em solid white",
    position: "absolute",
    top: "calc((80em - 20em) / 2)",
    left: "-0.3em",
    display: "block"
  },
  left: {},
  right: {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "rotateY(180deg)"
  }
});

export const Field: React.FC<FieldProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.container}>
        <div className={classes.field}>
          <div className={classes.left}>
            <span className={classes.halfwayLine}></span>
            <span className={classes.centerCircle}></span>
            <span className={classes.mark}></span>
            <span className={classes.penaltyArea}></span>
            <span className={classes.penaltyArc}></span>
            <span className={classes.goalArea}></span>
            {/* <span className="corner-arc"></span> */}
          </div>
          <div className={classes.right}>
            <span className={classes.halfwayLine}></span>
            <span className={classes.centerCircle}></span>
            <span className={classes.mark}></span>
            <span className={classes.penaltyArea}></span>
            <span className={classes.penaltyArc}></span>
            <span className={classes.goalArea}></span>
            {/* <span className="corner-arc"></span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
