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

// 안됨
export const useNewPreTeams = (
  preTeam: string | null,
  newTeam: string | null
) => {
  const pTeams = usePreTeams();
  const setPTeams = useSetPreTeams();

  let newPTeams: string[] = [];
  let update: boolean = true;
  if (preTeam === null && newTeam === null) {
    // do nothing
    update = false;
  } else if (preTeam === null || newTeam === null) {
    if (preTeam === null && newTeam !== null) {
      newPTeams = [...pTeams, newTeam];
    } else {
      newPTeams = pTeams.filter(x => {
        if (x === preTeam) return false;
        return true;
      });
    }
  } else {
    const Temp = pTeams.filter(x => {
      if (x === preTeam) return false;
      return true;
    });
    newPTeams = [...Temp, newTeam];
  }
  if (update) setPTeams(newPTeams);
};
