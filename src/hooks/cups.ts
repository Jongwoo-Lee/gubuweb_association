import { useEffect, useState } from "react";
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
      if (!newpTeams[group])
        newpTeams[group] = { t: pTeams[group].t, ft: pTeams[group].ft };

      newpTeams[group][order] = team;
    }
    setPTeams(newpTeams);
  }, [team]);

  return teams;
};

export const convertTimeString = (seconds: number): string => {
  let min: string = "00";
  let sec: string = "00";

  min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  sec = (seconds % 60).toString().padStart(2, "0");

  return `${min}:${sec}`;
};

export const useConvertTimeStr = (initialValue: number = 0) => {
  const [value, setValue] = useState<string>(convertTimeString(0));

  return {
    value,
    onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => {
      let time: string = "00:00"; // <-이런식으로 나옴
      if (!Array.isArray(value)) {
        time = convertTimeString(value);
      }
      setValue(time);
    }
  };
};
