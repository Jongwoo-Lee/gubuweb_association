import React from "react";
import TeamIcon from "../../images/team_off.svg";
import { Typography } from "@material-ui/core";
import { Team } from "../../models";

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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">{team.name}</Typography>
        <Typography variant="body2">매니저: {team.manager.name}</Typography>
      </div>
    </div>
  );
};
