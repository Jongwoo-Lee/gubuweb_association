import React from "react";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

export interface ChangeQaurterProps {}

export interface ChangeQaurterProps {
  numOfQuarter: number;
  curQuarter: number;
}

export const ChangeQaurter: React.FC<ChangeQaurterProps> = ({
  numOfQuarter,
  curQuarter
}: ChangeQaurterProps) => {
  const text: string =
    numOfQuarter === 2
      ? curQuarter === 0
        ? "전반전"
        : "후반전"
      : `${curQuarter + 1}쿼터`;
  return (
    <Grid container direction="row" justify="flex-end" alignItems="center">
      <Button>
        <KeyboardArrowLeftIcon />
      </Button>
      <Typography align="center" color="textPrimary" variant="h4">
        {text}
      </Typography>
      <Button>
        <KeyboardArrowRightIcon />
      </Button>
    </Grid>
  );
};
