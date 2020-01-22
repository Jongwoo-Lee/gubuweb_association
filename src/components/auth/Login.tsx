import * as React from "react";

import { AUTH } from "../../constants/texts";

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

export interface LoginProps {}

export const Login: React.SFC<LoginProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography color="textPrimary" variant="h4" className={classes.title}>
        관리자 로그인
      </Typography>
      <form className={classes.form} noValidate>
        <FormControl
          margin="normal"
          // error={email.error.length > 0}
          className={classes.formControl}
        >
          <InputLabel htmlFor="email">{AUTH.EMAIL}</InputLabel>
          <Input
            id="email"
            name="email"
            // value={email.value}
            // onChange={emailChange}
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
            // value={password.value}
            // onChange={passwordChange}
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
