import React, { useState, useEffect } from "react";
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
  TextField,
  Button,
  Grid,
  IconButton
} from "@material-ui/core";
import { useAssociationValue, useSetAssociationValue } from "../../context/user";
import Firebase, { FirebaseSetAsc } from "../../helpers/Firebase";
import { FirebaseAsc } from "../../helpers/Firebase";
import { useTextInput, } from "../../hooks";
import { AUTH, FORMTEXT, ERROR, STORAGE } from "../../constants/texts";
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
    label: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      width: "50%",
      height: "50%",
    },
    formControl: {
      width: "90%"
    },
    input: {
      display: 'none',
    }
  });
});


export interface AccountProps { }

export const Account: React.FC<AccountProps> = () => {
  const classes = useStyles();
  const ascData: FirebaseAsc = useAssociationValue();
  const setAscData: FirebaseSetAsc = useSetAssociationValue();
  // const loadData: boolean = (ascData && setAscData) ? true : false;

  let url: string = (ascData?.url) ? ascData?.url : "";

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
    let isInvalid = false;
    if (!validator.isLength(ascName.value, { min: 2, max: 18 })) {
      setAscName({ ...ascName, error: FORMTEXT.USERNAME_LENGTH });
    } else if (!validator.isMobilePhone(phoneNumber.value, "ko-KR")) {
      setPhoneNumber({ ...phoneNumber, error: FORMTEXT.PHONENUMBER_INFO });
    } else if (!validator.isEmail(email.value)) {
      setEmail({ ...email, error: ERROR.EMAIL_ERR_REGISTER });
    }
    else {
      isInvalid = true;
    }

    return isInvalid;
  };


  const saveAscInfo = (e: React.MouseEvent) => {
    e.preventDefault();

    const isInvalid = validateSave();
    if (ascData && setAscData && isInvalid) {

      const newAsc: FirebaseAsc = Firebase.fireInfoUpdate(
        ascData,
        email.value,
        ascName.value,
        phoneNumber.value,
        introduction.value
      )
      setAscData(newAsc);
    }
  };


  const selectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: FileList | null = e.target.files;
    if (ascData && setAscData && file && file?.length > 0) {
      const uploadTask: firebase.storage.UploadTask = Firebase.storage.ref(`${STORAGE.ASC}/${ascData.uid}`).put(file[0]);
      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {
        // progress function 
        console.log(snapshot);
      }, (err: Error) => {
        console.log(err);
      }, () => {
        Firebase.storage.ref(STORAGE.ASC).child(ascData.uid).getDownloadURL().then((url: string) => {
          const newAsc: FirebaseAsc = Firebase.fireURLUpdate(
            ascData,
            url
          );

          setAscData(newAsc);
        })
      });
    }

  };




  return (
    <div className={classes.manage}>
      <Grid container spacing={3}
        justify="space-between"
        alignItems="flex-start">
        <Typography color="textPrimary" variant="h4">
          연맹 정보 관리
        </Typography>
        <Button onClick={saveAscInfo}>
          저장
        </Button>
      </Grid>

      <br />
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-photo"
        type="file"
        onChange={selectImg}
      />
      <InputLabel htmlFor="icon-button-photo"
        className={classes.label}>
        <Avatar className={classes.avatar} src={url} />
      </InputLabel>
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
          label={FORMTEXT.INTRODUCTION}
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
