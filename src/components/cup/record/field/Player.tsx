import React from "react";
import Trophy from "../../../../images/trophy_on.svg";
import { makeStyles, ButtonBase, Box, Typography } from "@material-ui/core";
import { RecordType } from "./RecordField";
import { useSubstitution } from "../../../../hooks/cups";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  button: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundImage: `url(${Trophy})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
    // background: "white"
    // backgroundColor: "white"
  },
  img: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    height: "100%"
  },
  imgNot: {
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
    height: "100%",
    opacity: 0.4
  },
  stack: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export interface PlayerProps {
  isIn: boolean;
  pos: number;
  name: string;
  rType?: RecordType;
}

export const Player: React.FC<PlayerProps> = ({
  isIn,
  pos,
  name,
  rType
}: PlayerProps) => {
  const classes = useStyles();
  const { selUsr, handleOnClick } = useSubstitution(pos);

  return (
    <Box className={classes.root}>
      {rType !== "sub" ? (
        isIn ? (
          <div className={classes.root}>
            <ButtonBase disabled className={classes.button}>
              {/* <img className={classes.img} alt="complex" src={Trophy} /> */}
              <Typography color="secondary" className={classes.stack}>
                hi11
              </Typography>
            </ButtonBase>
            <Typography color="secondary">{name}</Typography>
          </div>
        ) : (
          <div />
        )
      ) : isIn ? (
        <div className={classes.root}>
          <ButtonBase
            style={{
              backgroundColor: selUsr === pos ? "blue" : undefined
            }}
            className={classes.button}
            onClick={handleOnClick}
          >
            <Typography color="secondary" className={classes.stack}>
              hi22
            </Typography>
          </ButtonBase>
          <Typography color="secondary">{name}</Typography>
        </div>
      ) : (
        <ButtonBase
          style={{ opacity: 0.5 }}
          className={classes.button}
          disableRipple
          onClick={
            selUsr !== -1
              ? handleOnClick
              : () => {
                  console.log(`selUsr - ${selUsr}`);
                }
          }
        >
          {/* <img className={classes.imgNot} alt="complex" src={Trophy} /> */}
          <Typography color="secondary" className={classes.stack}>
            hi33
          </Typography>
        </ButtonBase>
      )}
    </Box>
  );
};
