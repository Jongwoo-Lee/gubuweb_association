import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drop: {
      backgroundColor: "#555",
      width: "250px",
      height: "400px",
      margin: "32px"
    }
  })
);

interface DroppableProps {
  id: string;
  children?: JSX.Element | JSX.Element[];
}

export const Droppable: React.FC<DroppableProps> = ({
  id,
  children
}: DroppableProps) => {
  const classes = useStyles();
  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={classes.drop}
      id={id}
      onDrop={handleDrop}
      onDragOver={handleAllowDrop}
    >
      {children}
    </div>
  );
};
