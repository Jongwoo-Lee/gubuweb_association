import React, { useContext } from "react";
import { Team } from "../../helpers/Firebase/team";
import { useLoadTeam } from "../../hooks/team";
import { useAssociationValue } from "../user";

export type ContextSetTeams = React.Dispatch<React.SetStateAction<Team[]>>;

/// Firebase Auth User Context
interface TempData {
  teams: Team[];
  setTeams: ContextSetTeams;
}

const TeamContext: React.Context<TempData> = React.createContext<TempData>({
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
export const usePushTeam = () => useContext(TeamContext).setTeams;
// export const usePushTeam = (team: Team) => {
//     const teams: Team[] | null = useTeams();
//     const setTeams: ContextSetTeams = useContext(TeamContext).setTeams;

//     if (teams && setTeams !== null)
//         setTeams([...teams, team])
// };
