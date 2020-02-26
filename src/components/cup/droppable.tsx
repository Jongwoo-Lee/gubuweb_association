import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

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
  teamList: Array<string>; // 팀이 아닌 놈들이 드래그 앤드랍 되는 것을 막음
}

export const Droppable: React.FC<DroppableProps> = ({
  index,
  arrangeTeam,
  setArrageTeam,
  teamList
}: DroppableProps) => {
  const classes = useStyles();
  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain");
    const fIdx: number = teamList.findIndex(findTeam => findTeam === src);

    // find current Team List
    if (fIdx > -1) {
      const tIdx: number = arrangeTeam.findIndex(findTeam => findTeam === src);

      const newArr: Array<string> = [...arrangeTeam];

      newArr[index] = src;
      console.log(`newArr - ${newArr}`);
      if (tIdx > -1) newArr[tIdx] = "";

      setArrageTeam(newArr);
    }
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
