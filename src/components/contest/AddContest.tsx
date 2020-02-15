import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoback } from "../common/TitleGoBack";
import { useTextInput } from "../../hooks";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";
import { TEXTINPUT } from "../../constants/texts";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      margin: "0 20px"
    },
    formControl: {
      width: "90%",
      [theme.breakpoints.down("xs")]: {
        width: "70vw"
      }
    }
  });
});

export interface AddContestProps {}

export const AddContest: React.SFC<AddContestProps> = () => {
  const classes = useStyles();

  const {
    value: contestName,
    setValue: setContestName,
    onChange: contestChange
  } = useTextInput();

  const {
    value: region,
    setValue: setRegion,
    onChange: regionChange
  } = useTextInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <TitleGoback title="대회 추가" />
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <br />
        <FormControl
          className={classes.formControl}
          error={
            contestName.error !== undefined && contestName.error.length > 0
          }
        >
          <InputLabel htmlFor="name">{TEXTINPUT.CONTESTNAME}</InputLabel>
          <Input
            name="name"
            type="text"
            id="name"
            value={contestName.value}
            onChange={contestChange}
            autoFocus
            autoComplete="current-contest"
            aria-describedby="component-add-contest-text"
          />
          <FormHelperText id="component-add-contest-text">
            {contestName.error !== undefined &&
              contestName.error.length > 0 &&
              contestName.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={region.error !== undefined && region.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="region">{TEXTINPUT.REGION}</InputLabel>
          <Input
            id="region"
            name="region"
            type="text"
            value={region.value}
            onChange={regionChange}
            autoComplete="address"
            aria-describedby="component-add-region-text"
          />
          <FormHelperText id="component-add-region-text">
            {region.error !== undefined &&
              region.error.length > 0 &&
              region.error}
          </FormHelperText>
        </FormControl>
      </form>
    </div>
  );
};
