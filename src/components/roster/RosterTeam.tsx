import React from "react";
import { CurrentTeamProvider } from "../../context/team/team";
import { useRouteMatch, Route } from "react-router-dom";
import { ROUTENAMES, ROUTES } from "../../constants/routes";
import { RosterTeamPage } from "./RosterTeamPage";
import { PlayerInfo } from "./PlayerInfo";
import { WithTitle } from "../common/WithTitle";

export interface RosterTeamProps {}

export const RosterTeam: React.FC<RosterTeamProps> = () => {
  const match = useRouteMatch<{ teamUID: string }>();
  const defaultPath =
    ROUTES.ROSTER + ROUTES.ROSTER_TEAM + ROUTES.ROSTER_TEAM_ID;
  return (
    <CurrentTeamProvider teamUID={match.params.teamUID}>
      <Route exact path={defaultPath} component={RosterTeamComponent} />
      <Route
        path={
          defaultPath + ROUTES.ROSTER_TEAM_PLAYER + ROUTES.ROSTER_TEAM_PLAYER_ID
        }
        component={PlayerInfo}
      />
    </CurrentTeamProvider>
  );
};

export const RosterTeamComponent: React.FC = () => {
  return (
    <WithTitle title={ROUTENAMES.ROSTER}>
      <RosterTeamPage />
    </WithTitle>
  );
};
