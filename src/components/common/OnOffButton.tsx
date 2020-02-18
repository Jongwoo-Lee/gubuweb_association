import React from "react";
import { Button, withStyles, WithStyles } from "@material-ui/core";

export interface OnOffButtonProps {
  title: string;
  isOn: boolean;
  handleClick: (e: React.MouseEvent) => void;
}

interface Styles {
  color: string;
  children: React.ReactNode;
  [key: string]: any;
}

interface ColorsMapping {
  on: string;
  off: string;
  [key: string]: any;
}

interface ButtonStyles extends WithStyles<typeof styles> {
  color: string;
  onClick: (e: React.MouseEvent) => void;
}

const styledBy = (property: string, mapping: ColorsMapping) => (
  props: Styles
) => mapping[props[property]];

const styles = {
  button: {
    background: styledBy("color", { on: "#266CC2", off: "white" }),
    color: styledBy("color", { on: "white", off: "#333333" }),
    "&:hover": {
      background: styledBy("color", { on: "#488CFF", off: "#DDDDDD" })
    },
    boxShadow: "0.5px 0.5px 0.5px 0.5px grey",
    margin: "5px 10px",
    width: "100px"
  }
};
const StyledButton = withStyles(
  styles
)(({ classes, color, ...other }: ButtonStyles) => (
  <Button className={classes.button} {...other} />
));

export const OnOffButton: React.SFC<OnOffButtonProps> = ({
  title,
  isOn,
  handleClick
}) => {
  return (
    <StyledButton color={isOn ? "on" : "off"} onClick={handleClick}>
      {title}
    </StyledButton>
  );
};

export interface OnOffRadioButtonProps {
  title: string;
  checkInput: string;
  onChange: (
    event: React.MouseEvent<Element, MouseEvent>,
    newInput: string
  ) => void;
}

export const OnOffRadioButton: React.SFC<OnOffRadioButtonProps> = ({
  title,
  checkInput,
  onChange
}) => {
  const isOn = checkInput === title;
  return (
    <OnOffButton
      title={title}
      isOn={isOn}
      handleClick={(e: React.MouseEvent) => onChange(e, title)}
    />
  );
};
