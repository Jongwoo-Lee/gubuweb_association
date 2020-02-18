import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import { ContestRegister } from "../../helpers/Firebase/contest";
import { TitleGoback } from "../common/TitleGoBack";
import {
  useTextInput,
  useDateInput,
  useWindowSize,
  useRadioInput
} from "../../hooks";
import { FORMTEXT } from "../../constants/texts";
import DateFnsUtils from "@date-io/date-fns";
import korLocale from "date-fns/locale/ko";

import { OnOffRadioButton } from "../common/OnOffButton";
import {
  FormControl,
  Input,
  FormHelperText,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    title: {
      marginTop: "20px",
      marginBottom: "5px"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      margin: "0 20px"
    },
    formControl: {
      width: "100%",
      maxWidth: "500px",
      [theme.breakpoints.down("xs")]: {
        width: "75vw"
      }
    }
  });
});

export interface AddContestProps {}

export const AddContest: React.SFC<AddContestProps> = () => {
  const classes = useStyles();
  const { device } = useWindowSize();

  const { value: contestName, onChange: handleContestName } = useTextInput();
  const { value: region, onChange: handleRegion } = useTextInput();
  const { date: startDate, onChange: handleStartDate } = useDateInput();
  const { date: endDate, onChange: handleEndDate } = useDateInput();
  const { radio: cupType, onChange: handleCupType } = useRadioInput();
  const { radio: gender, onChange: handleGender } = useRadioInput();
  const { radio: athlete, onChange: handleAthlete } = useRadioInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <TitleGoback title="대회 추가" />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={korLocale}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <br />
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.CONTESTNAME} *
          </Typography>
          <FormControl
            className={classes.formControl}
            error={
              contestName.error !== undefined && contestName.error.length > 0
            }
          >
            <Input
              name="name"
              type="text"
              id="name"
              value={contestName.value}
              onChange={handleContestName}
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
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.REGION} *
          </Typography>
          <FormControl
            error={region.error !== undefined && region.error.length > 0}
            className={classes.formControl}
          >
            <Input
              id="region"
              name="region"
              type="text"
              value={region.value}
              onChange={handleRegion}
              autoComplete="address"
              aria-describedby="component-add-region-text"
            />
            <FormHelperText id="component-add-region-text">
              {region.error !== undefined &&
                region.error.length > 0 &&
                region.error}
            </FormHelperText>
          </FormControl>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.TERM} *
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Typography variant="body2">{FORMTEXT.START_DATE}</Typography>
              <DatePicker
                disableToolbar
                variant={device === "lg" ? "static" : "inline"}
                format="yyyy/MM/dd"
                id="date-startdate"
                value={startDate.date}
                onChange={handleStartDate}
              />
            </div>
            {device === "lg" ? (
              <h1 style={{ margin: "0 10px" }}>{" ~ "}</h1>
            ) : (
              <span style={{ margin: "0 10px" }}>{" ~ "}</span>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <Typography variant="body2">{FORMTEXT.END_DATE}</Typography>
              <DatePicker
                disableToolbar
                variant={device === "lg" ? "static" : "inline"}
                format="yyyy/MM/dd"
                id="date-enddate"
                value={endDate.date}
                onChange={handleEndDate}
              />
            </div>
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.TYPE} *
          </Typography>
          <div>
            <OnOffRadioButton
              title={FORMTEXT.TOURNAMENT}
              checkInput={cupType.input}
              onChange={handleCupType}
            />
            <OnOffRadioButton
              title={FORMTEXT.LEAGUE}
              checkInput={cupType.input}
              onChange={handleCupType}
            />
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.GENDER} *
          </Typography>
          <div>
            <OnOffRadioButton
              title={FORMTEXT.MALE}
              checkInput={gender.input}
              onChange={handleGender}
            />
            <OnOffRadioButton
              title={FORMTEXT.FEMALE}
              checkInput={gender.input}
              onChange={handleGender}
            />
            <OnOffRadioButton
              title={FORMTEXT.COED}
              checkInput={gender.input}
              onChange={handleGender}
            />
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.ALLOW_ATHLETE}
          </Typography>
          <div>
            <OnOffRadioButton
              title={FORMTEXT.NOTALLOWED}
              checkInput={athlete.input}
              onChange={handleAthlete}
            />
            <OnOffRadioButton
              title={FORMTEXT.ALLOWED}
              checkInput={athlete.input}
              onChange={handleAthlete}
            />
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.DOCUMENTS_NEEDED}
          </Typography>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};
