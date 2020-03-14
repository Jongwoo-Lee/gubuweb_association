import React, { useContext, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupInfoList } from "../../hooks";
import { firestore } from "firebase";

export type ContextSetCupInfos = Dispatch<SetStateAction<CupInfoObject>>;

export interface GameInfo {
  nQ: number; // numOfQuarter
  gT: number; // 단위: 분, gameTime
  rT: number; // 단위: 분, restTime
}

export interface CupPlanDataStructure {
  p: PlanPreliminary;
  f: PlanFinal;
}

export interface CupPlan {
  gI: GameInfo;
}

export interface Score {
  hp: number; // home point
  ap: number; // away point
}

interface GameDetailInfo {
  lo?: string; // lo -> lOCATION
  kt?: firebase.firestore.Timestamp | null; // kt => KICKOFFTIME, Save할 때는 Date
  gid?: string; // gid => Game UID
  w?: string; // winner uid
  sc?: Score; // score
}

export interface PlanPreliminary extends CupPlan {
  [group: number]: {
    [id: number]: GameDetailInfo; // kt: toJson,
  };
}

export interface PlanFinal extends CupPlan {
  [id: number]: GameDetailInfo;
  t?: { [team: number]: string }; // 4강 => 8팀
}

// type gaurd로 구분할 수 없어서 제네릭으로 만들지 못함
export const PlanDeepCopy = <T extends {}>(plan: T, isFinal: boolean): T => {
  let newPlan: T = JSON.parse(JSON.stringify(plan));
  if (isFinal) {
    Object.keys(plan).forEach((id: string) => {
      const findID: number = Number(id);
      if (Number.isNaN(findID) === false) {
        if (((plan as unknown) as PlanFinal)[findID].kt)
          ((newPlan as unknown) as PlanFinal)[
            findID
          ].kt = firestore.Timestamp.fromMillis(
            ((plan as unknown) as PlanFinal)[findID].kt?.toMillis() ?? 0 // typesciprt에서 못걸러주는듯
          );
      }
    });
  } else {
    Object.keys(plan).forEach((group: string) => {
      const findGroup: number = Number(group);
      if (Number.isNaN(findGroup) === false)
        Object.keys(((plan as unknown) as PlanPreliminary)[findGroup]).forEach(
          (id: string) => {
            const findID: number = Number(id);
            if (Number.isNaN(findID) === false) {
              if (
                ((plan as unknown) as PlanPreliminary)[Number(group)][findID].kt
              )
                ((newPlan as unknown) as PlanPreliminary)[Number(group)][
                  findID
                ].kt = firestore.Timestamp.fromMillis(
                  ((plan as unknown) as PlanPreliminary)[Number(group)][
                    findID
                  ].kt?.toMillis() ?? 0 // typesciprt에서 못걸러주는듯
                );
            }
          }
        );
    });
  }

  return newPlan;
};

/* 4강 예시
8번 자리에 있는 사람이 우승한다면 8: uid, 4:uid, 0:uid가 적힘
7번 자리에 있는 사람이 3위한다면 7:uid, 2:uid 에만 적힘 


   4강          결승            우승자 2위  3위 4위
    8
           4 (7 vs 8 승자)        0     1   2   3
    7

    6
           3 (5 vs 6 승자)    
    5
 */

export const parseLocation = (
  plan: { [id: number]: GameDetailInfo },
  subGameId: number
): string =>
  plan[subGameId] && plan[subGameId].lo ? plan[subGameId].lo ?? "" : "";

export const parseGameUID = (
  plan: { [id: number]: GameDetailInfo },
  subGameId: number
): string | undefined =>
  plan[subGameId] && plan[subGameId].gid
    ? plan[subGameId].gid ?? undefined
    : undefined;

export const parseTimeStamp = (
  plan: { [id: number]: GameDetailInfo },
  subGameId: number
): firebase.firestore.Timestamp | undefined =>
  plan[subGameId] && plan[subGameId].kt
    ? plan[subGameId].kt ?? undefined
    : undefined;

export const parseScore = (
  plan: { [id: number]: GameDetailInfo },
  subGameId: number
): Score | undefined =>
  plan[subGameId] && plan[subGameId].sc
    ? plan[subGameId].sc ?? undefined
    : undefined;

export const parseWinner = (
  plan: { [id: number]: GameDetailInfo },
  subGameId: number
): string | undefined =>
  plan[subGameId] && plan[subGameId].w
    ? plan[subGameId].w ?? undefined
    : undefined;

/// Firebase Auth User Context
interface CupInfoData {
  cupInfos: CupInfoObject | undefined;
  setCupInfos: ContextSetCupInfos;
  isLoading: boolean;
  curCupID: string | undefined;
  setCurCupID: Dispatch<SetStateAction<string | undefined>>;
}

export interface CupInfoObject {
  [key: string]: CupInfo;
}

export const CupInfoContext: React.Context<CupInfoData> = React.createContext<
  CupInfoData
>({
  cupInfos: undefined,
  setCupInfos: () => {
    console.log("cup no initialize");
  },
  isLoading: false,
  curCupID: undefined,
  setCurCupID: () => {
    console.log("set curID is not initialized");
  }
});

export const CupInfoProvider = (props: {
  children: React.ReactNode;
  cuplist: string[] | undefined;
}) => {
  const cupContextValue = useCupInfoList(props.cuplist);

  return (
    <CupInfoContext.Provider value={cupContextValue}>
      {props.children}
    </CupInfoContext.Provider>
  );
};

export const useCupsInfo = () => useContext(CupInfoContext).cupInfos;
export const useSetCupsInfo = () => useContext(CupInfoContext).setCupInfos;
export const useIsCupLoading = () => useContext(CupInfoContext).isLoading;

export const useCurCupID = () => useContext(CupInfoContext).curCupID;
export const useSetCurCupID = () => useContext(CupInfoContext).setCurCupID;
