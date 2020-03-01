import { useEffect } from "react";
import {
  useAttendTeams,
  useSetPreTeams,
  PreDataStructure
} from "../context/cup/cupMatch";

// 예선전 팀을 제외하고 남은 팀
export const useTeamsExceptPre = (
  team: string | null,
  pTeams: PreDataStructure,
  group: number,
  order: number
) => {
  const aTeams = useAttendTeams();
  const setPTeams = useSetPreTeams();
  const preTeams: string[] = new Array<string>();

  Object.values(pTeams).forEach((order: number, _) => {
    Object.values(order).forEach((team: string, _) => {
      preTeams.push(team);
    });
  });

  let teams = aTeams.filter(x => {
    if (preTeams.indexOf(x) !== -1) return false;
    return true;
  });
  // console.log(`pTeam - ${pTeams}  teams - ${teams}`);

  useEffect(() => {
    let newpTeams: PreDataStructure = JSON.parse(JSON.stringify(pTeams));

    if (team != null) {
      if (!newpTeams[group]) newpTeams[group] = {};

      newpTeams[group][order] = team;
    }
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
