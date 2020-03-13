import React, { useContext, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupInfoList } from "../../hooks";

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

interface GameDetailInfo {
  lo?: string; // lo -> lOCATION
  kt?: firebase.firestore.Timestamp | null; // kt => KICKOFFTIME, Save할 때는 Date
  gid?: string; // gid => Game UID
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
