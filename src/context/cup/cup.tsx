import React, { useContext } from "react";
import { CupInfoObject } from "../../helpers/Firebase/cup";
import { useCupInfoList } from "../../hooks";

export type ContextSetCupInfos = React.Dispatch<
  React.SetStateAction<CupInfoObject>
>;

/// Firebase Auth User Context
interface CupInfoData {
  cupInfos: CupInfoObject | undefined;
  setCupInfos: ContextSetCupInfos;
}

export const CupInfoContext: React.Context<CupInfoData> = React.createContext<
  CupInfoData
>({
  cupInfos: {},
  setCupInfos: () => {
    console.log("cup no initialize");
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
