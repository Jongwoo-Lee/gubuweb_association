import React from "react";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

export interface TitleGobackProps {
  title: string;
}

const TitleGoback: React.SFC<TitleGobackProps> = ({
  title
}: TitleGobackProps) => {
  const history = useHistory();

  const handleGoback = (e: React.MouseEvent) => {
    e.preventDefault();

    history.goBack();
  };

  return (
    <div style={{ display: "flex" }}>
      <Button variant="contained" onClick={handleGoback}>
        <ArrowBackIcon />
      </Button>

      <Typography
        style={{ marginLeft: "100px", marginRight: "auto" }}
        variant="h4"
      >
        {title}
      </Typography>
    </div>
  );
};

export default TitleGoback;
