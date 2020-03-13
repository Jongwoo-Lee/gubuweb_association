import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";

interface ControlProps {
  numOfItem: number;
  disPatchItem: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center"
  }
});
export const NumbericUpDownCtrl: React.FC<ControlProps> = ({
  numOfItem,
  disPatchItem
}: ControlProps) => {
  const classes = useStyles();
  const handleMinusValue = () => {
    if (numOfItem > 1) {
      const newValue: number = numOfItem - 1;
      disPatchItem(newValue);
    }
  };
  const handleAddValue = () => {
    const newValue: number = numOfItem + 1;
    disPatchItem(newValue);
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleMinusValue}>-</IconButton>
      {numOfItem}
      <IconButton onClick={handleAddValue}>+</IconButton>
    </div>
  );
};
