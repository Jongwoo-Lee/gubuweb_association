import React, { useState, useContext } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";

export type ContextSetCupInfos = React.Dispatch<React.SetStateAction<CupInfo[]>>;

/// Firebase Auth User Context
interface CupInfoData {
    cupInfos: CupInfo[];
    setCupInfos: ContextSetCupInfos;
}

export const CupInfoContext: React.Context<CupInfoData> = React.createContext<
    CupInfoData
>({ cupInfos: Array<CupInfo>(), setCupInfos: () => { console.log('cup no initialize') } });

export const CupInfoProvider = (props: { children: React.ReactNode }) => {
    const [cupInfos, setCupInfos] = useState<CupInfo[]>(Array<CupInfo>())

    return (
        <CupInfoContext.Provider value={{ cupInfos: cupInfos, setCupInfos: setCupInfos }}>
            {props.children}
        </CupInfoContext.Provider>
    );
};

export const useCupsInfo = () => useContext(CupInfoContext).cupInfos;
export const useSetCupsInfo = () => useContext(CupInfoContext).setCupInfos;

