import React from "react";
import { Player } from "./Player";
import { Box, makeStyles } from "@material-ui/core";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { CurTime } from "../../../../context/cup/cupRecord";
import { RecordType, ClickScore } from "../../../../hooks/cups";

export interface BenchProps {
  rType: RecordType;
  teamPos: TeamsPos;
  curTime: CurTime;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "22.5%", // field의 width와 최대한 맞춤
    background: "white"
  }
});

/** Styling properties applied to the board element */
const benchStyle: React.CSSProperties = {
  width: "100%",
  height: "700px",
  display: "flex",
  flexWrap: "wrap"
};
export const Bench: React.FC<BenchProps> = ({
  rType,
  teamPos,
  curTime,
  setScore,
  score
}: BenchProps) => {
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
        />
      </Box>
    );
  }

  const squares = [];
  for (let i = 1000; i < 1032; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={benchStyle}>{squares}</div>;
};
