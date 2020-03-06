import React, { useContext } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupInfoList } from "../../hooks";

export type ContextSetCupInfos = React.Dispatch<
  React.SetStateAction<CupInfoObject>
>;

export interface GameInfo {
  numOfQuarter: number;
  gameTime: number; // 단위: 분
  restTime: number; // 단위: 분
}

export interface CupPlanDataStructure {
  p: PlanPreliminary;
  f: PlanFinal;
}

export interface CupPlan {
  gameInfo: GameInfo;
}

export interface PlanPreliminary extends CupPlan {
  [group: number]: {
    [id: number]: { lo: string | null; kt: string | null }; // kt: toJson,
  }; // lo -> lOCATION, kt => KICKOFFTIME
}

export interface PlanFinal extends CupPlan {
  [id: number]: { lo: string | null; kt: string | null }; // kt: toJson
  // lo -> lOCATION, kt => KICKOFFTIME
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

/// Firebase Auth User Context
interface CupInfoData {
  cupInfos: CupInfoObject | undefined;
  setCupInfos: ContextSetCupInfos;
  isLoading: boolean;
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
  isLoading: false
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
