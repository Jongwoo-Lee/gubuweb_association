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
import {
  getGameRecord,
  TeamsRecord,
  TeamsPos,
  Log,
  Substitution,
  Goal
} from "../helpers/Firebase/game";
import {
  CurTime,
  makeQuarterString,
  deepCopySubstitution,
  useTeamRecordStack,
  useCurTeam,
  RecordStack
} from "../context/cup/cupRecord";
import { firestore } from "firebase";
import { useAssociationValue } from "../context/user";

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

export const useLoadCupRecord = (
  cupID: string,
  gameCard: GameCard
): [RecordStack, boolean] => {
  const [loading, setLoading] = useState(false);

  const [pos, setPos] = useState<Substitution>({});
  const [goals, setGoals] = useState<Goal[]>([]);
  const tempSubData = makeTempSubData(pos);

  const [pos2, setPos2] = useState<Substitution>({});
  const [goals2, setGoals2] = useState<Goal[]>([]);
  const tempSubData2 = makeTempSubData(pos2);

  useEffect(
    () => {
      const loadRecord = async () => {
        setLoading(true);

        let record: TeamsRecord = new TeamsRecord();
        await getGameRecord(cupID, gameCard.gid ?? "") // gid는 null undefined이 아님
          .then(querySnapshot => {
            const temp: TeamsRecord | undefined = querySnapshot.data();
            if (typeof temp !== "undefined") record = temp;
          })
          .catch(err => console.log(err));
        setLoading(false);
        setPos(record.h.substitution ?? {});
        setPos2(record.a.substitution ?? {});
        setGoals(record.h.score ?? []);
        setGoals2(record.a.score ?? []);
      };
      loadRecord();
      setLoading(false);
    },
    [
      /* 처음만 로딩 */
    ]
  );
  return [
    {
      [gameCard.team1 ?? "team1"]: {
        pos,
        setPos,
        tempSubData,
        goals,
        setGoals
      },
      [gameCard.team2 ?? "team2"]: {
        pos: pos2,
        setPos: setPos2,
        tempSubData: tempSubData2,
        goals: goals2,
        setGoals: setGoals2
      }
      // loading
    },
    loading
  ];
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

export type RecordType = "score" | "sub" | "";

export interface ClickScore {
  scorer: Array<string>;
  curFocus: "goal" | "ass";
}

export const useClickEvent = (
  pos: number,
  curTime: CurTime,
  teamPos: TeamsPos,
  score: ClickScore,
  setScore: React.Dispatch<React.SetStateAction<ClickScore>>,
  selUsr: number,
  setSelUsr: React.Dispatch<React.SetStateAction<number>>,
  rType?: RecordType
) => {
  const teamRecordData = useTeamRecordStack();
  const curTeam: string = useCurTeam();

  const teamRealPos = teamRecordData[curTeam].pos;
  const setTeamPos = teamRecordData[curTeam].setPos;
  const ascData = useAssociationValue();

  const handleOnClick =
    rType === "sub"
      ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();

          if (selUsr === -1) setSelUsr(pos);
          else {
            let newTeamPos: TeamsPos = JSON.parse(JSON.stringify(teamPos));

            //swap or move
            if (selUsr !== pos) {
              let temp = newTeamPos[selUsr];
              delete newTeamPos[selUsr];

              if (newTeamPos[pos]) {
                let temp2 = newTeamPos[pos];
                delete newTeamPos[pos];

                Object.assign(newTeamPos, { [selUsr]: temp2 });
              }

              Object.assign(newTeamPos, { [pos]: temp });
            } else {
              // do nothing
            }

            setSelUsr(-1);
            const newTeamRealPos = deepCopySubstitution(teamRealPos);
            newTeamRealPos[makeQuarterString(curTime)] = {
              log: {
                createdBy: ascData?.uid ?? "",
                timeStamp: firestore.Timestamp.now()
              },
              player_curPosition: newTeamPos
            };

            setTeamPos(newTeamRealPos);
          }
        }
      : rType === "score"
      ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          e.preventDefault();
          const newScore: ClickScore = JSON.parse(JSON.stringify(score));
          if (newScore.curFocus === "goal") {
            newScore.scorer[0] = teamPos[pos];
            newScore.curFocus = "ass";
          } else if (newScore.curFocus === "ass") {
            newScore.scorer[1] = teamPos[pos];
          }
          setScore(newScore);
        }
      : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          console.log("click");
        };

  return handleOnClick;
};

export interface TempSubData {
  Q: number;
  T: number;
  DATA: { log: Log; player_curPosition: TeamsPos };
}

export const makeTempSubData = (pos: Substitution): Array<TempSubData> => {
  let metaSub: Array<TempSubData> = [];
  metaSub = Object.keys(pos)
    .map((qurterTime: string) => {
      const q: number = Number(qurterTime.slice(1, 4));
      const time: number = Number(qurterTime.slice(4));
      return {
        Q: q,
        T: time,
        DATA: pos[qurterTime]
      };
    })
    .sort((a: TempSubData, b: TempSubData) => {
      if (a.Q !== b.Q) return a.Q - b.Q;
      else return a.T - b.T;
    }); // 여기까지는 사실 매번 렌더링 하지 않아도 됨

  return metaSub;
};

export const usePosition = (
  test: Array<TempSubData>,
  curTime: CurTime
): TeamsPos => {
  // 0.1 ms => 0.005ms 로 개선
  // console.time("calculatingTime");
  let findData: TeamsPos = {};

  // 여기까지는 사실 매번 렌더링 하지 않아도 됨
  test.forEach((st: TempSubData) => {
    if (st.Q <= curTime.curQuarter && st.T <= curTime.curTime * 1000) {
      findData = st.DATA?.player_curPosition ?? {};
    }
  });
  // console.timeEnd("calculatingTime");
  return findData;
};
