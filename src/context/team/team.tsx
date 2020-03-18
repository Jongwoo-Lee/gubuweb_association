import React, { useContext, useState, useEffect } from "react";
import { useLoadTeam } from "../../hooks/team";
import { useAssociationValue } from "../user";
import { Team, Player } from "../../models";

/// Team Context
export type ContextSetTeams = React.Dispatch<React.SetStateAction<Team[]>>;
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

//////////////////////////////////////
/////////// Player Context ///////////
//////////////////////////////////////

export type ContextSetPlayer = React.Dispatch<React.SetStateAction<Player>>;
interface PlayerContextData {
  player: Player;
  setPlayer: ContextSetPlayer;
}

// Team 안에 있는 Player 데이터는 Firestore DB 에서 가져온걸로만 바꿀수 있도록 해놓음
// 이 Context 는 Team-Player 데이터를 복사해서 안에서만 사용 가능
// 데이터 바꾸고 싶으면 Firestore 에 업로드해야 됨
const CurrentTeamPlayer: React.Context<PlayerContextData> = React.createContext<
  PlayerContextData
>({
  player: Player.empty(),
  setPlayer: () => {
    console.log("player context not initialized");
  }
});

export const CurrentPlayerProvider = (props: {
  children: React.ReactNode;
  playerUID: string;
}) => {
  const team = useCurrentTeam();

  const [player, setPlayer] = useState<Player>(Player.empty());

  useEffect(() => {
    const tempPl =
      team.players?.find(pl => pl.uid === props.playerUID) ?? Player.empty();
    setPlayer(Player.fromPlayer(tempPl));
    return () => {};
  }, [props.playerUID]);

  return (
    <CurrentTeamPlayer.Provider value={{ player, setPlayer }}>
      {props.children}
    </CurrentTeamPlayer.Provider>
  );
};

export const usePlayerContext = () => useContext(CurrentTeamPlayer);
export const useCurrentPlayer = () => useContext(CurrentTeamPlayer).player;
export const useSetPlayer = () => useContext(CurrentTeamPlayer).setPlayer;

// export const usePushTeam = () => useContext(TeamContext).setTeams;
// export const usePushTeam = (team: Team) => {
//     const teams: Team[] | null = useTeams();
//     const setTeams: ContextSetTeams = useContext(TeamContext).setTeams;

//     if (teams && setTeams !== null)
//         setTeams([...teams, team])
// };
