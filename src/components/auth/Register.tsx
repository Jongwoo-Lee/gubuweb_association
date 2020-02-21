import React from "react";
import Firebase from "../../helpers/Firebase";
import validator from "validator";
import { useHistory } from "react-router-dom";
import { useTextInput } from "../../hooks";

import { AUTH, FORMTEXT, ERROR } from "../../constants/texts";
import { ROUTES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Fab
} from "@material-ui/core";
import { TitleGoBack } from "../common/TitleGoBack";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    register: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
      textAlign: "center",

      marginTop: "3em",

      [theme.breakpoints.up("lg")]: {
        width: "40vw"
      }
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    formControl: {
      width: "90%",
      [theme.breakpoints.down("xs")]: {
        width: "70vw"
      }
    },
    submit: {
      marginTop: theme.spacing(2),
      width: "30em",
      [theme.breakpoints.down("xs")]: {
        width: "70vw"
      },
      color: "white",
      backgroundColor: theme.palette.primary.light,
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    }
  });
});

interface RegisterProps {}

export const Register: React.SFC<RegisterProps> = () => {
  const classes = useStyles();
  const history = useHistory();

  const {
    value: ascName,
    setValue: setAscName,
    onChange: ascNameChange
  } = useTextInput();

  const {
    value: email,
    setValue: setEmail,
    onChange: emailChange
  } = useTextInput();

  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    onChange: phoneNumberChange
  } = useTextInput();

  const {
    value: password,
    setValue: setPassword,
    onChange: passwordChange
  } = useTextInput();

  const {
    value: password2,
    setValue: setPassword2,
    onChange: password2Change
  } = useTextInput();

  const validateRegister = (): boolean => {
    let isInvalid = true;
    if (!validator.isLength(ascName.value, { min: 2, max: 18 })) {
      setAscName({ ...ascName, error: FORMTEXT.USERNAME_LENGTH });
    } else if (!validator.isMobilePhone(phoneNumber.value, "ko-KR")) {
      setPhoneNumber({ ...phoneNumber, error: FORMTEXT.PHONENUMBER_INFO });
    } else if (!validator.isEmail(email.value)) {
      setEmail({ ...email, error: ERROR.EMAIL_ERR_REGISTER });
    } else if (
      !validator.matches(
        password.value,
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*?()]{8,16}$/
      )
    ) {
      setPassword({ ...password, error: FORMTEXT.PASSWORD_INFO });
    } else if (password.value !== password2.value) {
      setPassword2({ ...password2, error: FORMTEXT.PASSWORD_DIFF });
    } else {
      isInvalid = false;
    }
    return isInvalid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isInvalid = validateRegister();

    if (!isInvalid) {
      Firebase.fireRegister(
        email.value,
        password.value,
        ascName.value,
        phoneNumber.value
      )
        .then(() => {
          setPassword({ ...password, value: "", error: "" });
          setPassword2({ ...password2, value: "", error: "" });
          history.push(ROUTES.HOME);
        })
        .catch((err: firebase.auth.Error) => {
          if (err.code === "auth/email-already-in-use")
            setEmail({ ...email, error: ERROR.EMAIL_ERR_ALREADY });
          else console.error("Register Err: ", err);
        });
    }
  };

  return (
    <div className={classes.register}>
      <TitleGoBack title="대회 관리자 회원가입" />
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <br />
        <FormControl
          className={classes.formControl}
          error={ascName.error !== undefined && ascName.error.length > 0}
        >
          <InputLabel htmlFor="name">{AUTH.ASCNAME}</InputLabel>
          <Input
            name="name"
            type="text"
            id="name"
            value={ascName.value}
            onChange={ascNameChange}
            autoFocus
            autoComplete="current-ascname"
            aria-describedby="component-register-ascname-text"
          />
          <FormHelperText id="component-register-ascname-text">
            {ascName.error !== undefined &&
              ascName.error.length > 0 &&
              ascName.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={email.error !== undefined && email.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="email">{AUTH.EMAIL}</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={email.value}
            onChange={emailChange}
            autoComplete="email"
            aria-describedby="component-register-email-text"
          />
          <FormHelperText id="component-register-email-text">
            {email.error !== undefined && email.error.length > 0 && email.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={
            phoneNumber.error !== undefined && phoneNumber.error.length > 0
          }
          className={classes.formControl}
        >
          <InputLabel htmlFor="phoneNumber">{AUTH.PHONE}</InputLabel>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            value={phoneNumber.value}
            onChange={phoneNumberChange}
            aria-describedby="component-register-phone-text"
          />
          <FormHelperText id="component-register-phone-text">
            {phoneNumber.error !== undefined &&
              phoneNumber.error.length > 0 &&
              phoneNumber.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={password.error !== undefined && password.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="password">{AUTH.PASSWORD}</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={password.value}
            onChange={passwordChange}
            aria-describedby="component-register-password-text"
          />
          <FormHelperText id="component-register-password-text">
            {password.error !== undefined &&
              password.error.length > 0 &&
              password.error}
          </FormHelperText>
        </FormControl>
        <FormControl
          error={password2.error !== undefined && password2.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="password2">{AUTH.PASSWORD2}</InputLabel>
          <Input
            id="password2"
            name="password2"
            type="password"
            value={password2.value}
            onChange={password2Change}
            aria-describedby="component-register-password2-text"
          />
          <FormHelperText id="component-register-password2-text">
            {password2.error !== undefined &&
              password2.error.length > 0 &&
              password2.error}
          </FormHelperText>
        </FormControl>
        <Fab
          variant="extended"
          type="submit"
          aria-label="register"
          className={classes.submit}
        >
          {AUTH.REGISTER}
        </Fab>
      </form>
    </div>
  );
};
