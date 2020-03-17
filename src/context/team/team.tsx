import React, { useContext } from "react";
import { useLoadTeam } from "../../hooks/team";
import { useAssociationValue } from "../user";
import { Team, Player } from "../../models";

export type ContextSetTeams = React.Dispatch<React.SetStateAction<Team[]>>;

/// Team Context
interface TeamContextData {
  teams: Team[];
  setTeams: ContextSetTeams;
}

const TeamContext: React.Context<TeamContextData> = React.createContext<
  TeamContextData
>({
  teams: Array<Team>(),
  setTeams: () => {
    console.log("team no initialize");
  }
});

export const TeamProvider = (props: { children: React.ReactNode }) => {
  const ascData = useAssociationValue();
  const { teams, setTeams } = useLoadTeam(ascData);

  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {props.children}
    </TeamContext.Provider>
  );
};

export const useAllTeams = () => useContext(TeamContext).teams;
export const useAscTeams = () =>
  useContext(TeamContext).teams.filter(team => team.isVerified);

const CurrentTeamContext: React.Context<Team> = React.createContext<Team>(
  Team.empty()
);

export const CurrentTeamProvider = (props: {
  children: React.ReactNode;
  teamUID: string;
}) => {
  const teams = useAscTeams();
  const team = teams.find(team => team.uid === props.teamUID) ?? Team.empty();

  return (
    <CurrentTeamContext.Provider value={team}>
      {props.children}
    </CurrentTeamContext.Provider>
  );
};

export const useCurrentTeam = () => useContext(CurrentTeamContext);

const CurrentTeamPlayer: React.Context<Player> = React.createContext<Player>(
  Player.empty()
);

export const CurrentPlayerProvider = (props: {
  children: React.ReactNode;
  playerUID: string;
}) => {
  const team = useCurrentTeam();
  const player =
    team.players?.find(pl => pl.uid === props.playerUID) ?? Player.empty();

  return (
    <CurrentTeamPlayer.Provider value={player}>
      {props.children}
    </CurrentTeamPlayer.Provider>
  );
};

export const useCurrentPlayer = () => useContext(CurrentTeamPlayer);

// export const usePushTeam = () => useContext(TeamContext).setTeams;
// export const usePushTeam = (team: Team) => {
//     const teams: Team[] | null = useTeams();
//     const setTeams: ContextSetTeams = useContext(TeamContext).setTeams;

//     if (teams && setTeams !== null)
//         setTeams([...teams, team])
// };
