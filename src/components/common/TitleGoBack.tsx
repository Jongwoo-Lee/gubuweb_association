import React from "react";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { SimpleButton } from "./Buttons";

export interface TitleGoBackProps {
  title: string;
}

export const TitleGoBack: React.SFC<TitleGoBackProps> = ({
  title
}: TitleGoBackProps) => {
  const history = useHistory();

  const handleGoback = (e: React.MouseEvent) => {
    e.preventDefault();

    history.goBack();
  };

  return (
    <div
      style={{
        display: "flex",
        marginLeft: "20px"
      }}
    >
      <Button variant="contained" onClick={handleGoback}>
        <ArrowBackIcon />
      </Button>

      <Typography
        style={{ marginLeft: "20px", display: "inline-block" }}
        variant="h4"
      >
        {title}
      </Typography>
    </div>
  );
};

export interface TitleGoBackSaveProps {
  title: string;
  handleClick: (e: React.MouseEvent) => void;
}

export const TitleGoBackSave: React.SFC<TitleGoBackSaveProps> = ({
  title,
  handleClick
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "600px"
      }}
    >
      <TitleGoBack title={title} />
      <SimpleButton title="저장" handleClick={handleClick} />
    </div>
  );
};
