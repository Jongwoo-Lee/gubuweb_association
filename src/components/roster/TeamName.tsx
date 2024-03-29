import React from "react";
import { Typography } from "@material-ui/core";
import { Team } from "../../models";
import { CommonImage } from "../common/CommonImage";

export interface TeamNameProps {
  team: Team;
  reverse?: boolean;
}

export const TeamName: React.FC<TeamNameProps> = ({ team, reverse }) => {
  return (
    <div style={{ display: "flex", marginLeft: "10px", marginBottom: "10px" }}>
      {reverse ?? <CommonImage src={team.logo} type={1} />}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">{team.name}</Typography>
        <Typography variant="body2">매니저: {team.manager.name}</Typography>
      </div>
      {reverse && (
        <div style={{ marginLeft: "10px" }}>
          <CommonImage src={team.logo} type={1} />
        </div>
      )}
    </div>
  );
};

export const SmallTeamName: React.FC<TeamNameProps> = ({ team }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
        marginBottom: "10px"
      }}
    >
      <CommonImage src={team.logo} type={1} width="40px" height="40px" />
      <Typography variant="body2">{team.name}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      ></div>
    </div>
  );
};
