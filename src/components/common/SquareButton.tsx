import React, { MouseEventHandler } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardActionArea, Dialog, DialogTitle, Button } from "@material-ui/core";

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
  imgSrc?: string;
  ImgIcon?(icon: SvgIconProps): JSX.Element;
  clickEvent: MouseEventHandler;
}

export interface SquareRouteButtonProps {
  route: string;
  title: string;
  imgSrc?: string;
  ImgIcon?(icon: SvgIconProps): JSX.Element;
  clickEvent?: MouseEventHandler;
}


export interface SquarePopDlgButtonProps {
  item: JSX.Element;
  title: string;
  imgSrc?: string;
  ImgIcon?(icon: SvgIconProps): JSX.Element;
  clickEvent?: MouseEventHandler;
}

export const SquareRouteButton: React.FC<SquareRouteButtonProps> = ({
  title,
  route,
  imgSrc,
  ImgIcon,
}: SquareRouteButtonProps) => {
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
    <SquareButton
      title={title}
      imgSrc={imgSrc}
      ImgIcon={ImgIcon}
      clickEvent={handleCardClick}
    />
  );
};


export const SquarePopDlgButton: React.FC<SquarePopDlgButtonProps> = ({
  item,
  title,
  imgSrc,
  ImgIcon,
}: SquarePopDlgButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInvite = () => {
    setOpen(false);
    console.log('go invite')

    // invite시 작업
  };


  return (<div>
    <SquareButton
      title={title}
      imgSrc={imgSrc}
      ImgIcon={ImgIcon}
      clickEvent={handleClickOpen}
    />
    <Dialog onClose={handleClose} aria-labelledby="teaminfo-dialog-title" open={open}>
      <DialogTitle id="teaminfo-dialog-title">팀 정보</DialogTitle>
      {item}
      <Button onClick={handleInvite}>초대</Button>
    </Dialog>
  </div>
  );
};


const SquareButton: React.FC<SquareButtonProps> = ({
  title,
  imgSrc,
  ImgIcon,
  clickEvent,
}: SquareButtonProps) => {
  const classes = useStyles();
  const handleCardClick: MouseEventHandler = clickEvent

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