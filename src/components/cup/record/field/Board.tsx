import React from "react";
import { Player } from "./Player";
import { Box, makeStyles } from "@material-ui/core";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { CurTime } from "../../../../context/cup/cupRecord";
import { RecordType, ClickScore } from "../../../../hooks/cups";

const useStyles = makeStyles({
  root: {
    display: "flex",

    flexDirection: "column"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "11.1%", // 100 / 9
    height: "16.6%", // 100 / 6
    background: "green"
  }
});

export interface BoardProps {
  rType: RecordType;
  teamPos: TeamsPos;
  curTime: CurTime;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
  selUsr: number;
  setSelUsr: React.Dispatch<React.SetStateAction<number>>;
}

/** Styling properties applied to the board element */
const boardStyle: React.CSSProperties = {
  width: "100%",
  height: "700px",
  display: "flex",
  flexWrap: "wrap"
};

export const Board: React.FC<BoardProps> = ({
  rType,
  teamPos,
  curTime,
  setScore,
  selUsr,
  setSelUsr,
  score
}: BoardProps) => {
  const classes = useStyles();
  function renderSquare(i: number) {
    const isPlayer = teamPos[i];
    return (
      <Box key={i} className={classes.box}>
        <Player
          isIn={isPlayer ? true : false}
          pos={i}
          rType={rType}
          teamPos={teamPos}
          curTime={curTime}
          score={score}
          setScore={setScore}
          selUsr={selUsr}
          setSelUsr={setSelUsr}
        />
      </Box>
    );
  }
  const squares = [];
  for (let i = 0; i < 9 * 6; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={boardStyle}>{squares}</div>;
};
