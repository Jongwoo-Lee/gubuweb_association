import React from "react";
import { useTeamPos } from "../../../../context/cup/cupRecord";
import { Player } from "./Player";
import { Box, makeStyles } from "@material-ui/core";
import { RecordType } from "./RecordField";

export interface BenchProps {
  rType: RecordType;
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
export const Bench: React.FC<BenchProps> = ({ rType }: BenchProps) => {
  const classes = useStyles();
  const pos = useTeamPos();
  function renderSquare(i: number) {
    const isPlayer = pos[i];
    return (
      <Box key={i} className={classes.box}>
        <Player
          isIn={isPlayer ? true : false}
          pos={i}
          name={pos[i]}
          rType={rType}
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
