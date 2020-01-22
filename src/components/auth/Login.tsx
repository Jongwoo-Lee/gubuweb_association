import React, { useState } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Firebase from "../../helpers/Firebase";
import { useInput } from "../../hooks";

import { AUTH } from "../../constants/texts";
import * as ROUTES from "../../constants/routes";

//Material UI
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Fab,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginTop: "10vh",
      [theme.breakpoints.down("xs")]: {
        marginTop: "5vw"
      },
      display: "grid",
      justifyContent: "center",
      textAlign: "center"
    },
    title: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      gridColumnStart: 1,
      gridColumnEnd: 4,
      gridRowStart: 1,
      gridRowEnd: 2
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      gridColumnStart: 1,
      gridColumnEnd: 4,
      gridRowStart: 3,
      gridRowEnd: 4
    },
    formControl: {
      width: "90%",
      [theme.breakpoints.down("xs")]: {
        width: "70vw"
      }
    },
    submit: {
      color: "white",
      backgroundColor: blue.A100,
      "&:hover": {
        backgroundColor: blue.A200
      },
      width: "30em",
      marginTop: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        width: "70vw"
      }
    }
  })
);

interface LoginProps extends RouteComponentProps {}

const LoginForm: React.SFC<LoginProps> = ({ history }) => {
  const classes = useStyles();

  const {
    value: email,
    setValue: setEmail,
    onChange: emailChange
  } = useInput();

  const {
    value: password,
    setValue: setPassword,
    onChange: passwordChange
  } = useInput();

  const [error, setError] = useState<firebase.auth.Error>({
    code: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let persistence: Promise<void>;
    persistence = Firebase.auth.setPersistence(Firebase.persistence.SESSION);
    persistence
      .then(() => {
        Firebase.fireLogin(email.value, password.value)
          .then(user => {
            setEmail({ ...email, value: "" });
            setPassword({ ...password, value: "" });
            // history.push(ROUTES.HOME);
          })
          .catch(err => setError(err));
      })
      .catch(err => {
        setError(err);
      });
  };

  return (
    <div className={classes.main}>
      <Typography color="textPrimary" variant="h4" className={classes.title}>
        관리자 로그인
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <FormControl
          margin="normal"
          // error={email.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="email">{AUTH.EMAIL}</InputLabel>
          <Input
            id="email"
            name="email"
            value={email.value}
            onChange={emailChange}
            autoComplete="email"
            autoFocus
            aria-describedby="component-loginemail-text"
          />
          <FormHelperText id="component-loginemail-text">
            {/* {email.error.length > 0 && email.error} */}
          </FormHelperText>
        </FormControl>
        <FormControl
          margin="normal"
          // error={password.error !== ""}
          className={classes.formControl}
        >
          <InputLabel htmlFor="password">{AUTH.PASSWORD}</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            value={password.value}
            onChange={passwordChange}
            autoComplete="current-password"
            aria-describedby="component-loginpassword-text"
          />
          <FormHelperText id="component-loginpassword-text">
            {/* {password.error.length > 0 && password.error} */}
          </FormHelperText>
        </FormControl>
        <Fab
          variant="extended"
          type="submit"
          color="primary"
          className={classes.submit}
        >
          {AUTH.LOGIN}
        </Fab>
      </form>

      {/* <Snackbar error={error} /> */}
    </div>
  );
};

export const Login = withRouter(LoginForm);
