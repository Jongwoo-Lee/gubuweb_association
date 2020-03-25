import React from "react";
import { Player } from "./Player";
import { Box, makeStyles } from "@material-ui/core";
import { TeamsPos } from "../../../../helpers/Firebase/game";
import { CurTime } from "../../../../context/cup/cupRecord";
import { RecordType, ClickScore } from "../../../../hooks/cups";
import FieldImg from "../../../../images/Football_field.svg";
import { useWindowSize } from "../../../../hooks";

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
    height: "16.6%" // 100 / 6
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
  const ratio: number = 1060 / 700;
  const { width } = useWindowSize();

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

  return (
    <div>
      <div
        style={{
          maxWidth: "700px",
          maxHeight: "1060px",
          width: `${width / 2}px`, // image size
          height: `${(width / 2) * ratio}px`, // image size
          display: "flex",
          flexWrap: "wrap",
          backgroundImage: `url(${FieldImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          padding: "25px"
        }}
      >
        {squares}
      </div>
    </div>
  );
};
