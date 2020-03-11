import React from "react";
import {
  Dialog,
  DialogTitle,
  makeStyles,
  Typography,
  TextField,
  Button,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useDateInput } from "../../../hooks";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "20px 20px",
    alignItems: "center"
  },
  contents: {
    display: "flex",
    flexDirection: "row",

    overflow: "auto"
  },
  items: {
    margin: "30px 30px 30px 30px"
  }
});

export interface ExitWithID {
  date: Date;
  id: number;
}

export interface DatePickerDlgProps {
  title: string;
  parentID: number;
  onClose: Function;
}

export const DatePickerDlg: React.FC<DatePickerDlgProps> = ({
  title,
  parentID,
  onClose
}: DatePickerDlgProps) => {
  const classes = useStyles();

  const {
    value: startDate,
    setDate: setStartDate,
    onChange: handleStartDate
  } = useDateInput(new Date());

  const handleClose = () => {
    onClose({ date: null, id: parentID });
  };

  const handleOk = () => {
    onClose({ date: startDate.value, id: parentID });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="datepicker-dialog-title"
      open={-1 !== parentID}
      fullWidth={true}
      maxWidth={"md"}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DialogTitle id="datepicker-dialog-title">
          <Typography align="center" color="textPrimary" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.root}>
          <div className={classes.contents}>
            <DatePicker
              disableToolbar
              variant="static"
              format="yyyy/MM/dd"
              id="plan-date"
              value={startDate.value}
              onChange={handleStartDate}
              className={classes.items}
            />
            <br />
            <TimePicker
              variant="static"
              views={["hours", "minutes"]}
              id="plan-time"
              value={startDate.value}
              onChange={handleStartDate}
              className={classes.items}
            />
          </div>
          <TextField
            fullWidth
            inputProps={{ min: 0, style: { textAlign: "center" } }}
            margin="dense"
            id="name"
            label="time"
            type=""
            value={
              startDate.value
                ? convertKoTime(startDate.value)
                : "시간 입력해주세요."
            }
            InputProps={{
              readOnly: true
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleOk} color="primary">
            <Typography align="center" color="textPrimary" variant="subtitle1">
              확인
            </Typography>
          </Button>
        </DialogActions>
      </MuiPickersUtilsProvider>
    </Dialog>
  );
};

export const convertKoTime = (date: Date) => {
  let newDate: Date = new Date(date);
  const hours: number = newDate.getHours();
  let hourStr: string =
    hours >= 12 ? `오후 ${hours - 12}시` : `오전 ${hours}시`;
  let day: string = "";
  switch (newDate.getDay()) {
    case 0:
      day = "(일)";
      break;
    case 1:
      day = "(월)";
      break;
    case 2:
      day = "(화)";
      break;
    case 3:
      day = "(수)";
      break;
    case 4:
      day = "(목)";
      break;
    case 5:
      day = "(금)";
      break;
    case 6:
      day = "(토)";
      break;
  }
  return `${newDate.getFullYear()}년 ${newDate.getMonth() +
    1}월 ${newDate.getDate()}일 ${day} ${hourStr} ${newDate.getMinutes()}분`;
};
