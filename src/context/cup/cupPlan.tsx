import React, { useState, useContext } from "react";
import { useLoadCupRecord, useGamePlan } from "../../hooks/cups";
import { firestore } from "firebase";
import { CupInfo } from "../../helpers/Firebase/cup";
import { CupMatchInfo, fromMatchInfo } from "./cupMatch";

export interface CupPlanDataStructure {
  p: PlanPreliminary;
  f: PlanFinal;
}

export interface CupPlan {
  gI: GameInfo;
}

export interface GameInfo {
  nQ: number; // numOfQuarter
  gT: number; // 단위: 분, gameTime
  rT: number; // 단위: 분, restTime
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

interface GameDetailInfo {
  lo?: string; // lo -> lOCATION
  kt?: firebase.firestore.Timestamp | null; // kt => KICKOFFTIME, Save할 때는 Date
  gid?: string; // gid => Game UID
  w?: string; // winner uid
  sc?: Score; // score
}

export interface Score {
  hp: number; // home point
  ap: number; // away point
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

export interface CurTime {
  curQuarter: number;
  curTime: number;
}

interface CupPlanData {
  planPre: PlanPreliminary;
  setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
  planFinal: PlanFinal;
  setPlanFinal: React.Dispatch<React.SetStateAction<PlanFinal>>;
  matchInfo: CupMatchInfo;
}

export const CupPlanContext: React.Context<CupPlanData> = React.createContext<
  CupPlanData
>({
  planPre: {
    gI: { nQ: 2, gT: 45, rT: 15 }
  },
  setPlanPre: () => {
    console.log(`initialize setPlanPre`);
  },
  planFinal: {
    gI: { nQ: 2, gT: 45, rT: 15 }
  },
  setPlanFinal: () => {
    console.log(`initialize setPlanFinal`);
  },
  matchInfo: fromMatchInfo()
});

export const CupPlanProvider = (props: {
  children: React.ReactNode;
  cupInfo: CupInfo;
}) => {
  return (
    <CupPlanContext.Provider value={useGamePlan(props.cupInfo)}>
      {props.children}
    </CupPlanContext.Provider>
  );
};

export const usePlanPre = () => useContext(CupPlanContext).planPre;
export const useSetPlanPre = () => useContext(CupPlanContext).setPlanPre;
export const usePlanFinal = () => useContext(CupPlanContext).planFinal;
export const useSetPlanFinal = () => useContext(CupPlanContext).setPlanFinal;
export const useMatchInfo = () => useContext(CupPlanContext).matchInfo;
