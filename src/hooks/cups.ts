import { useEffect, useState } from "react";
import { Team } from "../helpers/Firebase/team";
import Firebase from "../helpers/Firebase";
import {
  useAttendTeams,
  usePreTeams,
  useSetPreTeams
} from "../context/cup/cupTree";

export const useTreePreTeams = (team: string | null, pTeams: string[]) => {
  const aTeams = useAttendTeams();
  const setPTeams = useSetPreTeams();

  let teams = aTeams.filter(x => {
    if (pTeams.indexOf(x) !== -1) return false;
    return true;
  });
  console.log(`pTeam - ${pTeams}  teams - ${teams}`);

  useEffect(() => {
    let newpTeams: string[] = [...pTeams];
    if (team != null) {
      newpTeams.push(team);// = [...pTeams, team] ?? [];
    }
    //  else {
    //   newpTeams = aTeams.filter(x => {
    //     if (pTeams.indexOf(x) !== -1) return false;
    //     return true;
    //   });
    // }
    console.log(`useEffect ${newpTeams}`);
    setPTeams(newpTeams);
  }, [team]);

  return teams;
};

// 안됨
export const useNewPreTeams = (
  preTeam: string | null,
  newTeam: string | null,
  pTeams: string[]
) => {
  const setPTeams = useSetPreTeams();

  let newPTeams: string[] = [];
  let update: boolean = true;
  // useEffect(() => {

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
  setPTeams(newPTeams);
  // }, [])
};
