import React, { useState, useContext } from "react";
import { Team } from "../../helpers/Firebase/team";
import { useLoadTeam } from "../../hooks/team";



export type ContextSetTeams = React.Dispatch<React.SetStateAction<Team[]>>;


/// Firebase Auth User Context
interface TempData {
    teams: Team[];
    setTeams: ContextSetTeams;
}

const TeamContext: React.Context<TempData> = React.createContext<
    TempData
>({ teams: Array<Team>(), setTeams: () => { } });

export const TeamProvider = (props: { children: React.ReactNode }) => {
    const { teams, setTeams } = useLoadTeam();

    return (
        <TeamContext.Provider value={{ teams, setTeams }}>
            {props.children}
        </TeamContext.Provider>
    );
};

export const useTeams = () => useContext(TeamContext).teams;
export const usePushTeam = () => useContext(TeamContext).setTeams;
// export const usePushTeam = (team: Team) => {
//     const teams: Team[] | null = useTeams();
//     const setTeams: ContextSetTeams = useContext(TeamContext).setTeams;

//     if (teams && setTeams !== null)
//         setTeams([...teams, team])
// };

