import { useEffect, useState } from "react";
import { Team } from "../helpers/Firebase/team";
import Firebase from "../helpers/Firebase";
import {
  useAttendTeams,
  usePreTeams,
  useSetPreTeams
} from "../context/cup/cupTree";

export const useTreePreTeams = (team: string | null) => {
  const aTeams = useAttendTeams();
  const pTeams = usePreTeams();
  const setPTeams = useSetPreTeams();

  let teams = aTeams.filter(x => {
    if (pTeams.indexOf(x) !== -1) return false;
    return true;
  });
  console.log(`treeTeam - ${team}`);

  useEffect(() => {
    console.log(`useEffect ${team}`);
    if (team != null) {
      const newpTeams: string[] = [...pTeams, team] ?? [];
      setPTeams(newpTeams);
    } else {
      teams = aTeams.filter(x => {
        if (pTeams.indexOf(x) !== -1) return false;
        return true;
      });
    }
  }, [team]);

  return teams;
};
