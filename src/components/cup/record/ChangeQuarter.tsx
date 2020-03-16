import React from "react";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  useSetRecordTime,
  CurTime,
  useRecordTime
} from "../../../context/cup/cupRecord";

export interface ChangeQaurterProps {}

export interface ChangeQaurterProps {
  numOfQuarter: number;
}

export const ChangeQaurter: React.FC<ChangeQaurterProps> = ({
  numOfQuarter
}: ChangeQaurterProps) => {
  const setTime: React.Dispatch<React.SetStateAction<
    CurTime
  >> = useSetRecordTime();
  const { curQuarter, curTime } = useRecordTime();
  const handleLeft = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (curQuarter > 1) {
      const quarter: number = curQuarter - 2; // quarter index 쉬는 시간까지 2씩 뺴고 더함
      let newTime: CurTime = { curQuarter: quarter, curTime: 0 };
      setTime(newTime);
    }
  };

  const handleRight = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (curQuarter < numOfQuarter) {
      const quarter: number = curQuarter + 2;
      let newTime: CurTime = { curQuarter: quarter, curTime: 0 };
      setTime(newTime);
    }
  };

  const text: string =
    numOfQuarter === 2
      ? curQuarter === 1
        ? "전반전"
        : "후반전"
      : `${curQuarter}쿼터`;

  return (
    <Grid container direction="row" justify="flex-end" alignItems="center">
      <Button onClick={handleLeft}>
        <KeyboardArrowLeftIcon />
      </Button>
      <Typography align="center" color="textPrimary" variant="h4">
        {text}
      </Typography>
      <Button onClick={handleRight}>
        <KeyboardArrowRightIcon />
      </Button>
    </Grid>
  );
};
