import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import {
  useCurrentTeam,
  CurrentPlayerProvider,
  useCurrentPlayer
} from "../../context/team/team";
import { useRouteMatch } from "react-router-dom";
import { WithTitle } from "../common/WithTitle";
import { TeamName } from "./TeamName";
import { PlayerName } from "./PlayerName";

export const PlayerInfo: React.FC = () => {
  const match = useRouteMatch<{ playerUID: string }>();
  return (
    <CurrentPlayerProvider playerUID={match.params.playerUID}>
      <WithTitle title={ROUTENAMES.ROSTER}>
        <PlayerInfoComponent />
      </WithTitle>
    </CurrentPlayerProvider>
  );
};

const PlayerInfoComponent: React.FC = () => {
  const team = useCurrentTeam();
  const player = useCurrentPlayer();
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <PlayerName player={player} />
      <TeamName team={team} reverse={true} />
    </div>
  );
};
