import React, { useContext } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupInfoList } from "../../hooks";

export interface SubGameInfo {
  // [No: number]: string | null; // 4조(group) - 1 (No)
  team1: string | null;
  team1No: number;
  team2: string | null;
  team2No: number;
  location?: string;
  kickOffTime?: Date;
}

export type ContextSetCupInfos = React.Dispatch<
  React.SetStateAction<CupInfoObject>
>;

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
