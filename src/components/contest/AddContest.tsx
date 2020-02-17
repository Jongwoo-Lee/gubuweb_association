import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ContestRegister } from "../../helpers/Firebase/contest";
import { TitleGoback } from "../common/TitleGoBack";
import { useTextInput, useDateInput, useWindowSize } from "../../hooks";
import { FORMTEXT } from "../../constants/texts";
import DateFnsUtils from "@date-io/date-fns";
import korLocale from "date-fns/locale/ko";

import {
  FormControl,
  Input,
  FormHelperText,
  Typography
} from "@material-ui/core";
import { OnOffButton } from "../common/OnOffButton";

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
  const [cupType, setCupType] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [athlete, setAthlete] = useState<string>();

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
            <OnOffButton
              title={FORMTEXT.TOURNAMENT}
              isOn={cupType === FORMTEXT.TOURNAMENT}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                cupType === FORMTEXT.TOURNAMENT
                  ? setCupType("")
                  : setCupType(FORMTEXT.TOURNAMENT);
              }}
            />
            <OnOffButton
              title={FORMTEXT.LEAGUE}
              isOn={cupType === FORMTEXT.LEAGUE}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                cupType === FORMTEXT.LEAGUE
                  ? setCupType("")
                  : setCupType(FORMTEXT.LEAGUE);
              }}
            />
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.GENDER} *
          </Typography>
          <div>
            <OnOffButton
              title={FORMTEXT.MALE}
              isOn={gender === FORMTEXT.MALE}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                gender === FORMTEXT.MALE
                  ? setGender("")
                  : setGender(FORMTEXT.MALE);
              }}
            />
            <OnOffButton
              title={FORMTEXT.FEMALE}
              isOn={gender === FORMTEXT.FEMALE}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                gender === FORMTEXT.FEMALE
                  ? setGender("")
                  : setGender(FORMTEXT.FEMALE);
              }}
            />
            <OnOffButton
              title={FORMTEXT.COED}
              isOn={gender === FORMTEXT.COED}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                gender === FORMTEXT.COED
                  ? setGender("")
                  : setGender(FORMTEXT.COED);
              }}
            />
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.ALLOW_ATHLETE}
          </Typography>
          <div>
            <OnOffButton
              title={FORMTEXT.NOTALLOWED}
              isOn={athlete === FORMTEXT.NOTALLOWED}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                athlete === FORMTEXT.NOTALLOWED
                  ? setAthlete("")
                  : setAthlete(FORMTEXT.NOTALLOWED);
              }}
            />
            <OnOffButton
              title={FORMTEXT.ALLOWED}
              isOn={athlete === FORMTEXT.ALLOWED}
              handleClick={(e: React.MouseEvent) => {
                e.preventDefault();
                athlete === FORMTEXT.ALLOWED
                  ? setAthlete("")
                  : setAthlete(FORMTEXT.ALLOWED);
              }}
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
