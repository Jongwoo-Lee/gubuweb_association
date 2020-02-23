import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drag: {
      margin: "8px"
    }
  })
);

interface DraggableProps {
  id: string;
  children?: JSX.Element | JSX.Element[];
}

export const Draggable: React.FC<DraggableProps> = ({
  id,
  children
}: DraggableProps) => {
  const classes = useStyles();
  const handleDrag = (e: any) => {
    e.dataTransfer.setData("transfer", e.target.id);
  };

  const handleNoAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={handleDrag}
      onDragOver={handleNoAllowDrop}
      className={classes.drag}
    >
      {children}
    </div>
  );
};