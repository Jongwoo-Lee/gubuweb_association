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
      display: "flex",
      flexDirection: "column",
      width: "40vw",
      alignItems: "center",
      textAlign: "center",

      marginTop: "10vh",
      marginLeft: "auto",
      marginRight: "auto",

      [theme.breakpoints.down("sm")]: {
        width: "80vw"
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "5vw",
        width: "90vw"
      }
    },
    title: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
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
    register: {
      marginTop: theme.spacing(2),
      width: "30em",
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

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    history.push(ROUTES.REGISTER);
  };

  return (
    <div className={classes.main}>
      <Typography color="textPrimary" variant="h4" className={classes.title}>
        대회 관리자 로그인
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
            aria-describedby="component-login-email-text"
          />
          <FormHelperText id="component-login-email-text">
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
            aria-describedby="component-login-password-text"
          />
          <FormHelperText id="component-login-password-text">
            {/* {password.error.length > 0 && password.error} */}
          </FormHelperText>
        </FormControl>
        <Fab
          variant="extended"
          type="submit"
          aria-label="login"
          className={classes.submit}
        >
          {AUTH.LOGIN}
        </Fab>
      </form>
      <Fab
        variant="extended"
        aria-label="register"
        color="secondary"
        className={classes.register}
        onClick={handleRegister}
      >
        {AUTH.REGISTER}
      </Fab>
    </div>
  );
};

export const Login = withRouter(LoginForm);
