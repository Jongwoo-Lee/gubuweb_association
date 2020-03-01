import React from "react";
import { createStyles, makeStyles, Theme, Chip } from "@material-ui/core";
import { useFinalTeams } from "../../../context/cup/cupMatch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrap: {},

    chip: {
      margin: "15px",
      minWidth: "70px"
    }
  })
);

interface DraggableTeamListProps {
  teamList: Array<string>;
}

export const DraggableTeamList: React.FC<DraggableTeamListProps> = ({
  teamList
}: DraggableTeamListProps) => {
  const classes = useStyles();
  const final = useFinalTeams();
  const arrangeTeam: Array<string | null> = final["order"];

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
