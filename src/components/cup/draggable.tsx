import React from "react";
import { createStyles, makeStyles, Theme, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {},

    chip: {
      margin: "15px",
      minWidth: "70px"
    }
  })
);

interface DroppableStackProps {
  arrangeTeam: Array<string>;
  teamList: Array<string>;
}

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
    <div onDrop={handleDrop} onDragOver={handleAllowDrop}>
      {teamList.map(team => {
        const findTeam = arrangeTeam.find(find => find === team);
        return (
          <Chip
            className={classes.chip}
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
