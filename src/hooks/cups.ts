import { useEffect, useState } from "react";
import {
  useAttendTeams,
  useSetPreTeams,
  PreDataStructure,
  CupMatchInfo,
  FinalDataStructure
} from "../context/cup/cupMatch";
import { CupInfo } from "../models";
import { GameCard } from "../context/game/game";
import {
  CupPlanDataStructure,
  PlanPreliminary,
  PlanFinal,
  PlanDeepCopy
} from "../context/cup/cupPlan";
import { getGameRecord, TeamsRecord } from "../helpers/Firebase/game";

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

export const fromGameInfo = (
  plan: CupPlanDataStructure | null,
  gameInfo: GameCard
) => {
  let gameTime: number = 45;
  let numOfQuarter: number = 2;

  // final
  if (plan !== null) {
    if (gameInfo.group === undefined) {
      gameTime = plan.f.gI.gT;
      numOfQuarter = plan.f.gI.nQ;
    } else {
      gameTime = plan.p.gI.gT;
      numOfQuarter = plan.p.gI.nQ;
    }
  }
  return { gameTime, numOfQuarter };
};

export const useLoadCupRecord = (cupID: string, gameID: string) => {
  const [loading, setLoading] = useState(false);
  const [teamsRecord, setTeamsRecord] = useState<TeamsRecord>(
    new TeamsRecord()
  );

  useEffect(
    () => {
      const loadRecord = async () => {
        setLoading(true);

        let record: TeamsRecord = new TeamsRecord();
        await getGameRecord(cupID, gameID)
          .then(querySnapshot => {
            const temp: TeamsRecord | undefined = querySnapshot.data();
            if (typeof temp !== "undefined") record = temp;
          })
          .catch(err => console.log(err));
        setLoading(false);
        setTeamsRecord(record);
      };
      loadRecord();

      setLoading(false);
    },
    [
      /* 처음만 로딩 */
    ]
  );

  return { teamsRecord, loading };
};

// Game Plan을 얻어내는 hook...
export const useGamePlan = (cupInfo: CupInfo) => {
  let matchInfo: CupMatchInfo = fromMatchInfo(cupInfo.matchInfo ?? undefined);
  const [planPre, setPlanPre] = useState<PlanPreliminary>(
    cupInfo.matchPlan?.p ?? {
      gI: { nQ: 2, gT: 45, rT: 15 }
    }
  );

  const [planFinal, setPlanFinal] = useState<PlanFinal>(
    remakeFinalPlan(cupInfo, matchInfo)
  );

  return { planPre, setPlanPre, planFinal, setPlanFinal, matchInfo };
};

// plan을 Match Info에서 가져와서 만든다.
const fromMatchInfo = (matchInfo?: CupMatchInfo): CupMatchInfo => {
  let iPData: PreDataStructure = {};
  let iFData: FinalDataStructure = {
    order: new Array<string | null>(8).fill(null),
    round: 8
  };
  let iNumOfRound: number = 1;
  let iNumOfWild: number = 1;
  if (matchInfo) {
    if (matchInfo.f !== null) {
      iFData.round = matchInfo.f.round;
      if (matchInfo.f.order !== null) {
        iFData.order = Array.from(matchInfo.f.order);
      }
    }

    //set preliminary data
    if (matchInfo.p !== null) {
      iPData = matchInfo.p;
    }
    if (matchInfo.ro !== null) {
      iNumOfRound = matchInfo.ro;
    }
    if (matchInfo.w !== null) {
      iNumOfWild = matchInfo.w;
    }
  }

  return { p: iPData, f: iFData, ro: iNumOfRound, w: iNumOfWild };
};

const remakeFinalPlan = (
  cupInfo: CupInfo,
  matchInfo: CupMatchInfo
): PlanFinal => {
  let finalPlan: PlanFinal = {
    gI: { nQ: 2, gT: 45, rT: 15 }
  };

  if (cupInfo.matchPlan && cupInfo.matchPlan.f) {
    finalPlan = cupInfo.matchPlan.f;
  }

  if (finalPlan.t) {
    const round: number = Number(matchInfo.f.round);

    let j: number = 0;
    for (let i = round * 2; i > round; i--) {
      let team: string = "";
      if (matchInfo.f.order[j]) team = matchInfo.f.order[j] ?? "";

      // finalPlan데이터가 있으면 그것을 우선 사용한다.
      if (finalPlan.t[i] && finalPlan.t[i] === "") {
        console.log(`finalPlan.t[i] 만드는 중 `);
        console.dir(finalPlan.t[i]);
        finalPlan.t[i] = team;
      }
      j++;
    }
  } else {
    finalPlan.t = {};
    const round: number = Number(matchInfo.f.round);

    let j: number = 0;
    for (let i = round * 2; i > round; i--) {
      let team: string = "";
      if (matchInfo.f.order[j]) team = matchInfo.f.order[j] ?? "";
      finalPlan.t[i] = team;
      j++;
    }
  }

  return finalPlan;
};

export const useLocalPlanPreState = (planPre: PlanPreliminary) => {
  const [tempPlan, setTempPlan] = useState<PlanPreliminary>(
    PlanDeepCopy(planPre, false)
  );
  // useEffect(() => {}, [JSON.stringify(planPre)]);
  return { tempPlan, setTempPlan };
};
