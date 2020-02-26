import React, { useState } from "react";
import { createStyles, makeStyles, Theme, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drag: {
      minWidth: " 100px",
      width: "5%",

      height: "50px",
      margin: "5px"
    }
  })
);

interface DraggableProps {
  name: string;
}

export const Draggable: React.FC<DraggableProps> = ({
  name
}: DraggableProps) => {
  const [team, setTeam] = useState(name);
  const classes = useStyles();
  const handleDrag = (e: any) => {
    e.dataTransfer.setData("text/plain", team);
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain");
    console.log(`src - ${src}`);

    setTeam(src);
  };

  return (
    <Chip
      className={classes.drag}
      onDragOver={handleAllowDrop}
      onDrop={handleDrop}
      onDragStart={handleDrag}
      draggable="true"
      label={team}
      color="primary"
    ></Chip>
    // <div
    //   id={id}
    //   draggable="true"
    //   onDragStart={handleDrag}
    //   onDrop={handleDrop}
    //   onDragOver={handleAllowDrop}
    //   className={classes.drag}
    // >
    //   {team}
    // </div>
  );
};
