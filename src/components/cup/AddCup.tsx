import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CupInfo, setCupInfo } from "../../helpers/Firebase/cup";
import { TitleGoBackSave } from "../common/TitleGoBack";
import {
  useTextInput,
  useDateInput,
  useWindowSize,
  useRadioInput,
  useListInput
} from "../../hooks";
import { FORMTEXT } from "../../constants/texts";
import DateFnsUtils from "@date-io/date-fns";
import korLocale from "date-fns/locale/ko";

import { OnOffRadioButton, SimpleButton } from "../common/Buttons";
import {
  FormControl,
  Input,
  FormHelperText,
  Typography,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ROUTENAMES } from "../../constants/routes";

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

export interface AddCupProps {}

export const AddCup: React.SFC<AddCupProps> = () => {
  const classes = useStyles();
  const { device } = useWindowSize();

  const { value: cupName, onChange: handleCupName } = useTextInput();
  const { value: region, onChange: handleRegion } = useTextInput();
  const { date: startDate, onChange: handleStartDate } = useDateInput();
  const { date: endDate, onChange: handleEndDate } = useDateInput();
  const { radio: cupType, onChange: handleCupType } = useRadioInput();
  const { radio: gender, onChange: handleGender } = useRadioInput();
  const { value: cupIntro, onChange: handleCupIntro } = useTextInput();
  const { radio: athlete, onChange: handleAthlete } = useRadioInput();
  const { value: allowedRange, onChange: handleAllowedRange } = useTextInput();
  const {
    list: documents,
    setList: setDocuments,
    onElementChange,
    onElementDelete
  } = useListInput();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <TitleGoBackSave title={ROUTENAMES.ADD_CUP} handleClick={handleSubmit} />
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={korLocale}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <br />
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.CUPNAME} *
          </Typography>
          <FormControl
            className={classes.formControl}
            error={cupName.error !== undefined && cupName.error.length > 0}
          >
            <Input
              name="name"
              type="text"
              id="name"
              value={cupName.value}
              onChange={handleCupName}
              autoFocus
              autoComplete="current-cup"
              aria-describedby="component-add-cup-text"
            />
            <FormHelperText id="component-add-cup-text">
              {cupName.error !== undefined &&
                cupName.error.length > 0 &&
                cupName.error}
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
            {FORMTEXT.CUP_INTRO}
          </Typography>
          <FormControl
            className={classes.formControl}
            error={cupIntro.error !== undefined && cupIntro.error.length > 0}
          >
            <TextField
              variant="outlined"
              name="introduction"
              type="text"
              id="introduction"
              multiline
              rows="6"
              value={cupIntro.value}
              onChange={handleCupIntro}
              aria-describedby="component-manage-introduction-text"
            />

            <FormHelperText id="component-manage-introduction-text">
              {cupIntro.error !== undefined &&
                cupIntro.error.length > 0 &&
                cupIntro.error}
            </FormHelperText>
          </FormControl>
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
          {athlete.input === FORMTEXT.ALLOWED && (
            <FormControl
              className={classes.formControl}
              style={{ marginTop: "10px" }}
              error={
                allowedRange.error !== undefined &&
                allowedRange.error.length > 0
              }
            >
              <InputLabel htmlFor="allowedrange">
                {FORMTEXT.ALLOWEDRANGE}
              </InputLabel>
              <Input
                name="allowedrange"
                type="text"
                id="allowedrange"
                value={allowedRange.value}
                onChange={handleAllowedRange}
                autoFocus
                autoComplete="document"
                aria-describedby="component-allowedrange-text"
              />
              <FormHelperText id="component-allowedrange-text">
                {allowedRange.error !== undefined &&
                  allowedRange.error.length > 0 &&
                  allowedRange.error}
              </FormHelperText>
            </FormControl>
          )}
          <div>
            <Typography
              className={classes.title}
              variant="body1"
              style={{ display: "inline-block" }}
            >
              {FORMTEXT.DOCUMENTS_NEEDED}
            </Typography>
            <Typography
              className={classes.title}
              variant="body2"
              style={{ display: "inline-block", marginLeft: "1em" }}
            >
              {FORMTEXT.DOCUMENTS_INFO}
            </Typography>
          </div>
          <div className={classes.root}>
            {documents.map((input, index) => {
              return (
                <FormControl
                  className={classes.formControl}
                  error={input.error !== undefined && input.error.length > 0}
                >
                  <Input
                    name={`document${index}`}
                    type="text"
                    id={`document${index}`}
                    value={input.value}
                    onChange={e => onElementChange(e, index)}
                    autoFocus
                    autoComplete="document"
                    aria-describedby={`component-document-text-${index}`}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="delete-document"
                          onClick={e => onElementDelete(e, index)}
                        >
                          <Delete />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id={`component-document-text-${index}`}>
                    {input.error !== undefined &&
                      input.error.length > 0 &&
                      input.error}
                  </FormHelperText>
                </FormControl>
              );
            })}

            {documents.length < 3 && (
              <SimpleButton
                title="+ 추가"
                handleClick={e => {
                  e.preventDefault();
                  if (documents.length >= 3) return;
                  let addDoc = [...documents];

                  addDoc.push({ value: "", error: "" });
                  setDocuments(addDoc);
                }}
              />
            )}
          </div>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};
