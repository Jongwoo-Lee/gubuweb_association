import React from "react";
import Trophy from "../../../../images/trophy_on.svg";
import { makeStyles, ButtonBase, Box, Typography } from "@material-ui/core";
import { useClickEvent, ClickScore, RecordType } from "../../../../hooks/cups";
import { CurTime } from "../../../../context/cup/cupRecord";
import { TeamsPos } from "../../../../helpers/Firebase/game";

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
    opacity: 0.3
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
  curTime: CurTime;
  teamPos: TeamsPos;
  rType?: RecordType;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
}

export const Player: React.FC<PlayerProps> = ({
  isIn,
  pos,
  curTime,
  teamPos,
  rType,
  setScore,
  score
}: PlayerProps) => {
  const classes = useStyles();
  const { selUsr, handleOnClick } = useClickEvent(
    pos,
    curTime,
    teamPos,
    score,
    setScore,
    rType
  );

  return (
    <Box className={classes.root}>
      {rType !== "sub" ? (
        isIn ? (
          <div className={classes.root}>
            <ButtonBase
              disabled={rType === "score" ? false : true}
              onClick={rType === "score" ? handleOnClick : undefined}
              className={classes.button}
            >
              <Typography color="secondary" className={classes.stack}>
                등번호
              </Typography>
            </ButtonBase>
            <Typography color="secondary">{teamPos[pos]}</Typography>
          </div>
        ) : (
          <div />
        )
      ) : (
        <div className={classes.root}>
          <ButtonBase
            style={{
              backgroundColor: selUsr === pos ? "blue" : undefined,
              opacity: isIn ? 1 : 0.5
            }}
            className={classes.button}
            onClick={
              isIn ? handleOnClick : selUsr !== -1 ? handleOnClick : undefined
            }
            disableRipple={isIn ? false : true}
          >
            <Typography color="secondary" className={classes.stack}>
              등번호
            </Typography>
          </ButtonBase>
          <Typography color="secondary">{teamPos[pos]}</Typography>
        </div>
      )}
    </Box>
  );
};
