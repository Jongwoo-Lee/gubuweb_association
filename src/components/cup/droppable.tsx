import React, { useState } from "react";
import { createStyles, makeStyles, Theme, Chip } from "@material-ui/core";
import { Draggable } from "./draggable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drop: {
      backgroundColor: "red",
      width: "250px",
      height: "50px",
      margin: "5px"
    },
    dropStack: {
      backgroundColor: "#555",
      width: "250px",
      height: "400px",
      margin: "32px"
    }
  })
);
interface DroppableProps {
  index: number;
  arrangeTeam: Array<string>;
  setArrageTeam: React.Dispatch<React.SetStateAction<string[]>>;
}

interface DroppableStackProps {
  arrangeTeam: Array<string>;
  teamList: Array<string>;
}

export const Droppable: React.FC<DroppableProps> = ({
  index,
  arrangeTeam,
  setArrageTeam
}: DroppableProps) => {
  const classes = useStyles();
  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain"); // document.getElementById(e.dataTransfer.getData("text/plain"));

    console.log(`arrangeTeam[index] - ${arrangeTeam[index]}`);
    const newArr: Array<string> = [...arrangeTeam];
    newArr[index] = src;

    setArrageTeam(newArr);
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={classes.drop}
      onDrop={event => handleDrop(event)}
      onDragOver={handleAllowDrop}
    >
      {arrangeTeam[index] && <div>{arrangeTeam[index]}</div>}
    </div>
  );
};

export const DroppableStack: React.FC<DroppableStackProps> = ({
  arrangeTeam,
  teamList
}: DroppableStackProps) => {
  const classes = useStyles();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrag = (e: any, team: string) => {
    e.dataTransfer.setData("text/plain", team);
  };

  return (
    <div
      className={classes.dropStack}
      onDrop={handleDrop}
      onDragOver={handleAllowDrop}
    >
      {teamList.map(team => {
        const findTeam = arrangeTeam.find(find => find === team);
        return (
          <Chip
            onDragStart={e => handleDrag(e, team)}
            draggable="true"
            color={findTeam === team ? "default" : "primary"}
            label={team}
          ></Chip>
        );
      })}
    </div>
  );
};
