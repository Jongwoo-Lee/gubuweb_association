import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles({
  canvas: {
    position: "absolute",
    left: (props: BracketLineProps) => props.left,
    top: (props: BracketLineProps) => props.top,
    width: (props: BracketLineProps) => props.width,
    height: (props: BracketLineProps) => props.height
  }
});

interface BracketLineProps {
  left: string;
  top: string;
  height: string;
  width: string;
}

const defaultProps = {
  bgcolor: "background.paper",
  border: 2,
  borderColor: "text.primary"
};

export const BracketLine: React.FC<BracketLineProps> = ({
  left,
  top,
  height,
  width
}: BracketLineProps) => {
  const classes = useStyles({
    left: left,
    top: top,
    height: height,
    width: width
  });

  return <Box {...defaultProps} borderLeft={0} className={classes.canvas} />;
};
