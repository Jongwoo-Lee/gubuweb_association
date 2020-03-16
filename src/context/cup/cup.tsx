import React, { useContext, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../models";
import { useCupInfoList } from "../../hooks";
import { firestore } from "firebase";

export type ContextSetCupInfos = Dispatch<SetStateAction<CupInfoObject>>;

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
