import React from "react";
import { Team } from "../../helpers/Firebase/team";
import TeamIcon from "../../images/team_off.svg";
import { Typography } from "@material-ui/core";

export interface TeamNameProps {
  team: Team;
}

export const TeamName: React.FC<TeamNameProps> = ({ team }) => {
  return (
    <div style={{ display: "flex" }}>
      <img
        src={team.logo ?? TeamIcon}
        alt={team.name + "logo" ?? "undefined team logo"}
        style={{ width: "75px", height: "75px", marginRight: "20px" }}
      />
      <Typography variant="h4">{team.name}</Typography>
    </div>
  );
};
