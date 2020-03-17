import React from "react";
import { CurrentTeamProvider } from "../../context/team/team";
import { useRouteMatch } from "react-router-dom";
import { ROUTENAMES } from "../../constants/routes";
import { TitleGoBack } from "../common/TitleGoBack";
import { RosterTeamPage } from "./RosterTeamPage";

export interface RosterTeamProps {}

export const RosterTeam: React.FC<RosterTeamProps> = () => {
  const match = useRouteMatch<{ teamId: string }>();

  return (
    <CurrentTeamProvider teamUID={match.params.teamId}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TitleGoBack title={ROUTENAMES.ROSTER} />
        <RosterTeamPage />
      </div>
    </CurrentTeamProvider>
  );
};
