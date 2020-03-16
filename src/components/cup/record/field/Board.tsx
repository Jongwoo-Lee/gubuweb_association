import React from "react";
import { Player } from "./Player";
import { Box, makeStyles } from "@material-ui/core";
import { RecordType } from "./RecordField";
import { TeamsPos } from "../../../../helpers/Firebase/game";

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
}

/** Styling properties applied to the board element */
const boardStyle: React.CSSProperties = {
  width: "100%",
  height: "700px",
  display: "flex",
  flexWrap: "wrap"
};

export const Board: React.FC<BoardProps> = ({ rType, teamPos }: BoardProps) => {
  const classes = useStyles();
  function renderSquare(i: number) {
    const isPlayer = teamPos[i];
    return (
      <Box key={i} className={classes.box}>
        <Player
          isIn={isPlayer ? true : false}
          pos={i}
          name={teamPos[i]}
          rType={rType}
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
