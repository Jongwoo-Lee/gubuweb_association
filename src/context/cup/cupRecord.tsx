import React, { useContext } from "react";
import { useCupInfoList } from "../../hooks";
import { useLoadCupRecord } from "../../hooks/cups";
import { TeamsRecord } from "../../helpers/Firebase/game";

interface CurTime {
  curQuarter: number;
  curTime: number;
}
// Firebase Auth User Context
interface CupRecordData {
  time: CurTime;
  loading: boolean;
  teamsRecord: TeamsRecord;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  time: { curQuarter: 1, curTime: 0 },
  loading: false,
  teamsRecord: new TeamsRecord()
});

export const CupRecordProvider = (props: {
  children: React.ReactNode;
  cupID: string;
  gameID: string;
}) => {
  const { teamsRecord, loading } = useLoadCupRecord(props.cupID, props.gameID);
  return (
    <CupRecordContext.Provider
      value={{ time: { curQuarter: 1, curTime: 0 }, teamsRecord, loading }}
    >
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordTime = () => useContext(CupRecordContext).time;
export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
