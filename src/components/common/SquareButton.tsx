import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardActionArea } from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import { SvgIconProps } from "@material-ui/core/SvgIcon";

const useStyles = makeStyles({
  root: {
    width: 200,
    minWidth: 150,
    margin: "20px 20px"
  },
  media: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface SquareButtonProps {
  title: string;
  route: string;
  imgSrc?: string;
  ImgIcon?(icon: SvgIconProps): JSX.Element;
}

export const SquareButton: React.SFC<SquareButtonProps> = ({
  title,
  route,
  imgSrc,
  ImgIcon
}: SquareButtonProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === route) {
    } else {
      history.push(route);
    }
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea className={classes.media} onClick={handleCardClick}>
        <br />
        {imgSrc !== undefined && (
          <img
            src={imgSrc}
            alt={title}
            style={{ width: "150px", height: "150px" }}
          />
        )}
        {ImgIcon !== undefined && <ImgIcon style={{ fontSize: "150px" }} />}

        <br />
        <Typography align="center" variant="body1" component="span">
          {title}
        </Typography>
        <br />
      </CardActionArea>
    </Card>
  );
};
