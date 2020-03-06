import React from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Grid
} from "@material-ui/core";
import { CupPlan } from "../../../context/cup/cup";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 10px"
  },
  inputLabel: {
    color: "black",
    "&.Mui-focused": {
      color: "blue"
    }
  },
  title: {
    margin: "10px 10px"
  }
});

interface GameInfoInputProps<T extends CupPlan> {
  plan: T;
  setPlan: React.Dispatch<React.SetStateAction<T>>;
}

export const GameInfoInput = <T extends CupPlan>(
  props: GameInfoInputProps<T>
) => {
  const plan: T = props.plan;
  const setPlan: React.Dispatch<React.SetStateAction<T>> = props.setPlan;
  const classes = useStyles();

  const handleQuarter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlan: T = JSON.parse(JSON.stringify(plan));
    newPlan.gameInfo.numOfQuarter = Number(event.target.value);

    setPlan(newPlan);
  };
  const handleGameTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlan: T = JSON.parse(JSON.stringify(plan));
    newPlan.gameInfo.gameTime = Number(event.target.value);

    setPlan(newPlan);
  };

  const handleRestTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPlan: T = JSON.parse(JSON.stringify(plan));
    newPlan.gameInfo.restTime = Number(event.target.value);

    setPlan(newPlan);
  };

  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid
          className={classes.title}
          container
          spacing={3}
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid item xs>
            <FormControl>
              <InputLabel
                htmlFor="component-simple"
                className={classes.inputLabel}
              >
                쿼터 수
              </InputLabel>
              <Input
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                id="component-simple"
                value={plan.gameInfo.numOfQuarter}
                onChange={handleQuarter}
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl>
              <InputLabel
                htmlFor="component-game-time"
                className={classes.inputLabel}
              >
                게임 시간(분)
              </InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">분</InputAdornment>
                }
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                id="component-game-time"
                value={plan.gameInfo.gameTime}
                onChange={handleGameTime}
                type="number"
              />
            </FormControl>
          </Grid>
          <Grid item xs>
            <FormControl>
              <InputLabel
                htmlFor="component-rest-time"
                className={classes.inputLabel}
              >
                휴식 시간(분)
              </InputLabel>
              <Input
                endAdornment={
                  <InputAdornment position="end">분</InputAdornment>
                }
                inputProps={{ min: 0, style: { textAlign: "center" } }}
                id="component-rest-time"
                value={plan.gameInfo.restTime}
                onChange={handleRestTime}
                type="number"
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
