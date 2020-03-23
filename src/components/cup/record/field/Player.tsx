import React from "react";
import Tshirt from "../../../../images/T-shirt.png";
import SelTshirt from "../../../../images/T-shirt-sel.png";
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
    height: "100%"
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
  selUsr: number;
  setSelUsr: React.Dispatch<React.SetStateAction<number>>;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
}

export const Player: React.FC<PlayerProps> = ({
  isIn,
  pos,
  curTime,
  teamPos,
  setScore,
  score,
  selUsr,
  setSelUsr,
  rType
}: PlayerProps) => {
  const classes = useStyles();
  const handleOnClick = useClickEvent(
    pos,
    curTime,
    teamPos,
    score,
    setScore,
    selUsr,
    setSelUsr,
    rType
  );

  return (
    <Box className={classes.root}>
      {rType !== "sub" ? (
        isIn ? (
          <div className={classes.root}>
            <ButtonBase
              style={{
                backgroundImage: `url(${Tshirt})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "80%"
              }}
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
              backgroundImage:
                selUsr !== pos ? `url(${Tshirt})` : `url(${SelTshirt})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "80%",
              // backgroundColor: selUsr === pos ? "blue" : undefined,
              opacity: isIn ? 1 : 0.5
            }}
            className={classes.button}
            onClick={
              isIn ? handleOnClick : selUsr !== -1 ? handleOnClick : undefined
            }
            disableRipple={isIn ? false : true}
          >
            <Typography color="secondary" className={classes.stack}>
              {isIn ? "등번호" : ""}
            </Typography>
          </ButtonBase>
          <Typography color="secondary">{teamPos[pos]}</Typography>
        </div>
      )}
    </Box>
  );
};
