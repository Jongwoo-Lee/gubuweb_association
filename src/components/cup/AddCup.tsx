import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { batchCupInfo } from "../../helpers/Firebase/cup";
import { TitleGoBack } from "../common/TitleGoBack";
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
  TextField,
  Fab,
  CircularProgress
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ROUTENAMES } from "../../constants/routes";
import { useAssociationValue } from "../../context/user";
import { useHistory } from "react-router-dom";
import { CupInfo } from "../../models";

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
      marginLeft: "20px",
      marginRight: "20px",
      marginBottom: "100px"
    },
    formControl: {
      width: "100%",
      maxWidth: "500px",
      [theme.breakpoints.down("xs")]: {
        width: "75vw"
      }
    },
    error: {
      color: "red",
      fontSize: "1em"
    },
    submit: {
      marginTop: theme.spacing(5),
      maxWidth: "500px",
      width: "40vw",
      [theme.breakpoints.down("md")]: {
        width: "50vw"
      },
      [theme.breakpoints.down("sm")]: {
        width: "60vw"
      },
      [theme.breakpoints.down("xs")]: {
        width: "80vw"
      },
      color: "white",
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    }
  });
});

export interface AddCupProps {}

export const AddCup: React.SFC<AddCupProps> = () => {
  const classes = useStyles();
  const { device } = useWindowSize();
  const ascData = useAssociationValue();
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  const {
    value: cupName,
    setValue: setCupName,
    onChange: handleCupName
  } = useTextInput();
  const {
    value: region,
    setValue: setRegion,
    onChange: handleRegion
  } = useTextInput();
  const {
    value: startDate,
    setDate: setStartDate,
    onChange: handleStartDate
  } = useDateInput(new Date());
  const {
    value: endDate,
    setDate: setEndDate,
    onChange: handleEndDate
  } = useDateInput(new Date());
  const {
    radio: cupType,
    setRadio: setCupType,
    onChange: handleCupType
  } = useRadioInput();
  const {
    radio: gender,
    setRadio: setGender,
    onChange: handleGender
  } = useRadioInput();
  const {
    value: cupIntro,
    setValue: setCupIntro,
    onChange: handleCupIntro
  } = useTextInput();
  const {
    radio: athlete,
    setRadio: setAthlete,
    onChange: handleAthlete
  } = useRadioInput();
  const {
    value: allowedRange,
    setValue: setAllowedRange,
    onChange: handleAllowedRange
  } = useTextInput();
  const {
    list: documents,
    setList: setDocuments,
    onElementChange,
    onElementDelete
  } = useListInput();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    const isValid = validateCupInfo();

    if (isValid) {
      if (
        startDate.value === null ||
        endDate.value === null ||
        ascData?.uid === undefined
      )
        return;

      const listDocs = [...documents].map(doc => doc.value);

      const newCup = new CupInfo(
        cupName.value,
        region.value,
        startDate.value,
        endDate.value,
        cupType.value,
        gender.value,
        new Date(),
        ascData?.uid,
        athlete.value,
        allowedRange.value,
        undefined,
        cupIntro.value,
        listDocs,
        undefined, // selectedTeams
        null, // matchInfo
        null // matchPlan
      );

      setLoading(true);
      await batchCupInfo(newCup)
        .then(() => {
          setCupName({ ...cupName, value: "" });
          setRegion({ ...region, value: "" });
          setStartDate({ ...startDate, value: new Date() });
          setEndDate({ ...endDate, value: new Date() });
          setCupType({ ...cupType, value: "" });
          setGender({ ...gender, value: "" });
          setCupIntro({ ...cupIntro, value: "" });
          setAthlete({ ...athlete, value: "" });
          setAllowedRange({ ...allowedRange, value: "" });
          setDocuments(
            [...documents].map(doc => {
              return { ...doc, value: "" };
            })
          );
          history.goBack();
        })
        .catch(err => console.log(err));
      setLoading(false);
    }
  };

  const validateCupInfo = (): boolean => {
    let isValid = true;
    if (cupName.value === undefined || cupName.value === "") {
      setCupName({
        ...cupName,
        error: FORMTEXT.ENTER_CUPNAME
      });
      isValid = false;
    }
    if (region.value === undefined || region.value === "") {
      setRegion({ ...region, error: FORMTEXT.ENTER_REGION });
      isValid = false;
    }
    if (!startDate.value || startDate.value === undefined) {
      setStartDate({ ...startDate, error: FORMTEXT.ENTER_START_DATE });
      isValid = false;
    } else if (!endDate.value || endDate.value === undefined) {
      setEndDate({ ...endDate, error: FORMTEXT.ENTER_END_DATE });
      isValid = false;
    } else if (startDate.value.getDate() > endDate.value.getDate()) {
      setEndDate({ ...endDate, error: FORMTEXT.START_BEFORE_END });
      isValid = false;
    }
    if (cupType.value === undefined || cupType.value === "") {
      setCupType({ ...cupType, error: FORMTEXT.ENTER_TYPE });
      isValid = false;
    }
    if (gender.value === undefined || gender.value === "") {
      setGender({ ...gender, error: FORMTEXT.ENTER_GENDER });
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.ADD_CUP} />
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
                value={startDate.value}
                onChange={handleStartDate}
              />
              <ErrorText value={startDate.error} />
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
                value={endDate.value}
                onChange={handleEndDate}
              />
              <ErrorText value={endDate.error} />
            </div>
          </div>
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.TYPE} *
          </Typography>
          <div>
            <OnOffRadioButton
              title={FORMTEXT.TOURNAMENT}
              checkInput={cupType.value}
              onChange={handleCupType}
            />
            <OnOffRadioButton
              title={FORMTEXT.LEAGUE}
              checkInput={cupType.value}
              onChange={handleCupType}
            />
          </div>
          <ErrorText value={cupType.error} />
          <Typography className={classes.title} variant="body1">
            {FORMTEXT.GENDER} *
          </Typography>
          <div>
            <OnOffRadioButton
              title={FORMTEXT.MALE}
              checkInput={gender.value}
              onChange={handleGender}
            />
            <OnOffRadioButton
              title={FORMTEXT.FEMALE}
              checkInput={gender.value}
              onChange={handleGender}
            />
            <OnOffRadioButton
              title={FORMTEXT.COED}
              checkInput={gender.value}
              onChange={handleGender}
            />
          </div>
          <ErrorText value={gender.error} />
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
              checkInput={athlete.value}
              onChange={handleAthlete}
            />
            <OnOffRadioButton
              title={FORMTEXT.ALLOWED}
              checkInput={athlete.value}
              onChange={handleAthlete}
            />
          </div>
          {athlete.value === FORMTEXT.ALLOWED && (
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
            {documents.map((doc, index) => {
              return (
                <FormControl
                  className={classes.formControl}
                  error={doc.error !== undefined && doc.error.length > 0}
                >
                  <Input
                    name={`document${index}`}
                    type="text"
                    id={`document${index}`}
                    value={doc.value}
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
                    {doc.error !== undefined &&
                      doc.error.length > 0 &&
                      doc.error}
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
          <Fab
            variant="extended"
            type="submit"
            aria-label="add-cup-firebase"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress /> : "대회 생성"}
          </Fab>
        </form>
      </MuiPickersUtilsProvider>
    </div>
  );
};

const ErrorText = ({ value }: { value: string | undefined }) => {
  return (
    <p style={{ color: "red", fontSize: "1em" }}>
      {value !== undefined && value.length > 0 && value}
    </p>
  );
};
