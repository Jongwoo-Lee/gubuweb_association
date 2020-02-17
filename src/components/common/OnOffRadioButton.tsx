import React from "react";
import { OnOffButton } from "./OnOffButton";

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
