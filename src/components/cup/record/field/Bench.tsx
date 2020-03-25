import React from "react";
import { Player } from "./Player";
import { Box } from "@material-ui/core";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { CurTime } from "../../../../context/cup/cupRecord";
import { RecordType, ClickScore } from "../../../../hooks/cups";
import { useWindowSize } from "../../../../hooks";

export interface BenchProps {
  rType: RecordType;
  teamPos: TeamsPos;
  curTime: CurTime;
  selUsr: number;
  setSelUsr: React.Dispatch<React.SetStateAction<number>>;
  score: ClickScore;
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>;
}

/** Styling properties applied to the board element */
const benchStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "white",
  maxWidth: "350px"
};

export const Bench: React.FC<BenchProps> = ({
  rType,
  teamPos,
  curTime,
  setScore,
  selUsr,
  setSelUsr,
  score
}: BenchProps) => {
  const { device } = useWindowSize();

  function renderSquare(i: number) {
    const isPlayer = teamPos[i];
    return (
      <Box
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: `${device === "sm" || device === "md" ? "50%" : "22.5%"}`, // field의 width와 최대한 맞춤
          background: "white"
        }}
      >
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
  for (let i = 1000; i < 1032; i += 1) {
    squares.push(renderSquare(i));
  }
  return <div style={benchStyle}>{squares}</div>;
};
