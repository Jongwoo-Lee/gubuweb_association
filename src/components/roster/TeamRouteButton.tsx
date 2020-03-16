import React from "react";
import TeamIcon from "../../images/team_off.svg";
import { SquareRouteButton } from "../common/SquareButton";
import { TeamInfoProps } from "../common/TeamInfo";
import { SquarePopDlgButton } from "./SquarePopDlgButton";

export const TeamRouteButton: React.FC<TeamInfoProps> = ({ team }) => {
  console.log(team.name + team.logo);
  const teamName = team.isVerified ? team.name : team.name + " (승인대기)";
  return team.isVerified ? (
    <SquareRouteButton
      title={teamName}
      route={team.uid}
      imgSrc={team.logo ?? TeamIcon}
    />
  ) : (
    <SquarePopDlgButton team={team} isDelete={true} />
  );
};
