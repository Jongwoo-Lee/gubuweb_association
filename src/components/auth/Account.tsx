import React from "react";
import {
  Avatar,
  makeStyles,
  createStyles,
  Theme,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField
} from "@material-ui/core";
import { useAssociationValue } from "../../context/user";
import { FirebaseAsc } from "../../helpers/Firebase";
import { useTextInput } from "../../hooks";
import { AUTH, TEXTINPUT, ERROR } from "../../constants/texts";
import validator from "validator";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    manage: {
      display: "flex",
      flexDirection: "column",
      width: "40vw",
      alignItems: "center",

      marginTop: "3em",
      marginLeft: "auto",
      marginRight: "auto"
    },
    avatar: {
      width: "30%",
      height: "30%"
    },
    formControl: {
      width: "90%"
    }
  });
});

export interface AccountProps {}

export const Account: React.FC<AccountProps> = () => {
  const classes = useStyles();
  const ascData: FirebaseAsc = useAssociationValue();
  console.log(`ascData ${ascData}`);

  // 동일한 이름을 사용 할 수 없으니 새롭게 이름을 정해준다 javascript
  const {
    value: ascName,
    setValue: setAscName,
    onChange: ascNameChange
  } = useTextInput(ascData?.name == null ? "" : ascData?.name);

  const {
    value: email,
    setValue: setEmail,
    onChange: emailChange
  } = useTextInput(ascData?.email == null ? "" : ascData?.email);

  const {
    value: phoneNumber,
    setValue: setPhoneNumber,
    onChange: phoneNumberChange
  } = useTextInput(ascData?.phoneNumber == null ? "" : ascData?.phoneNumber);

  const {
    value: introduction,
    setValue: setIntroduction,
    onChange: introductionChange
  } = useTextInput(ascData?.introduction == null ? "" : ascData?.introduction);

  const validateSave = (): boolean => {
    let isInvalid = true;
    if (!validator.isLength(ascName.value, { min: 2, max: 18 })) {
      setAscName({ ...ascName, error: TEXTINPUT.USERNAME_LENGTH });
    } else if (!validator.isMobilePhone(phoneNumber.value, "ko-KR")) {
      setPhoneNumber({ ...phoneNumber, error: TEXTINPUT.PHONENUMBER_INFO });
    } else if (!validator.isEmail(email.value)) {
      setEmail({ ...email, error: ERROR.EMAIL_ERR_REGISTER });
    } else {
      isInvalid = false;
    }

    return isInvalid;
  };

  return (
    <div className={classes.manage}>
      <Typography color="textPrimary" variant="h4">
        연맹 정보 관리
      </Typography>
      <br />

      <Avatar className={classes.avatar} />
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
          aria-describedby="component-manage-ascname-text"
        />
        <FormHelperText id="component-manage-ascname-text">
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
          aria-describedby="component-manage-email-text"
        />
        <FormHelperText id="component-manage-email-text">
          {email.error !== undefined && email.error.length > 0 && email.error}
        </FormHelperText>
      </FormControl>
      <FormControl
        error={phoneNumber.error !== undefined && phoneNumber.error.length > 0}
        className={classes.formControl}
      >
        <InputLabel htmlFor="phoneNumber">{AUTH.PHONE}</InputLabel>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="number"
          value={phoneNumber.value}
          onChange={phoneNumberChange}
          aria-describedby="component-manage-phone-text"
        />
        <FormHelperText id="component-manage-phone-text">
          {phoneNumber.error !== undefined &&
            phoneNumber.error.length > 0 &&
            phoneNumber.error}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl
        className={classes.formControl}
        error={
          introduction.error !== undefined && introduction.error.length > 0
        }
      >
        <TextField
          variant="outlined"
          name="introduction"
          type="text"
          label={TEXTINPUT.INTRODUCTION}
          id="introduction"
          multiline
          rows="6"
          value={introduction.value}
          onChange={introductionChange}
          aria-describedby="component-manage-introduction-text"
        ></TextField>

        <FormHelperText id="component-manage-introduction-text">
          {introduction.error !== undefined &&
            introduction.error.length > 0 &&
            introduction.error}
        </FormHelperText>
      </FormControl>
    </div>
  );
};
