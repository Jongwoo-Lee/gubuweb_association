import React from "react";
import TeamIcon from "../../images/team_off.svg";
import { SquareRouteButton } from "../common/SquareButton";
import { TeamInfoProps } from "../common/TeamInfo";
import { SquarePopDlgButton } from "./SquarePopDlgButton";
import { ROUTES } from "../../constants/routes";

export const TeamRouteButton: React.FC<TeamInfoProps> = ({ team }) => {
  return team.isVerified ? (
    <SquareRouteButton
      title={team.name}
      route={ROUTES.ROSTER + ROUTES.ROSTER_TEAM + "/" + team.uid}
      imgSrc={team.logo ?? TeamIcon}
    />
  ) : (
    <SquarePopDlgButton team={team} isDelete={true} />
  );
};
