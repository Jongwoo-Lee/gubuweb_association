import React from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Chip,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Grid
} from "@material-ui/core";
import { useFinalTeams } from "../../../context/cup/cupMatch";
import { useTextInput } from "../../../hooks";

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

interface GameInfoInputProps {
  //   numOfQuarter: number;
  //   quarterTime: number;
  //   restTime: number;
}

export const GameInfoInput: React.FC<GameInfoInputProps> = ({}: //   numOfQuarter,
//   quarterTime,
//   restTime
GameInfoInputProps) => {
  const test: number = 2;
  const classes = useStyles();
  const [name, setName] = React.useState<number>(test);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`change - ${event.target.value}`);
    setName(Number(event.target.value));
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
                value={name}
                onChange={handleChange}
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
                value={name}
                onChange={handleChange}
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
                value={name}
                onChange={handleChange}
                type="number"
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
