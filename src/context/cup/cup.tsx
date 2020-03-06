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

export interface PlanPreliminary {
  [group: number]: {
    [id: number]: { lo: string | null; kt: string | null }; // kt: toJson,
  }; // lo -> lOCATION, kt => KICKOFFTIME
  gameInfo: GameInfo;
}

export interface PlanFinal {
  [id: number]: { lo: string | null; kt: string | null }; // kt: toJson,
  // lo -> lOCATION, kt => KICKOFFTIME
  gameInfo: GameInfo;
}

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
