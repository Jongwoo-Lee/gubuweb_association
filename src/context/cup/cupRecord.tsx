import React, { useContext, useState } from "react";
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
  setTime: React.Dispatch<React.SetStateAction<CurTime>>;
  loading: boolean;
  teamsRecord: TeamsRecord;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  time: { curQuarter: 1, curTime: 0 },
  setTime: () => {
    console.log("setTime is not initilized");
  },
  loading: false,
  teamsRecord: new TeamsRecord()
});

export const CupRecordProvider = (props: {
  children: React.ReactNode;
  cupID: string;
  gameID: string;
}) => {
  const { teamsRecord, loading } = useLoadCupRecord(props.cupID, props.gameID);
  const [time, setTime] = useState<CurTime>({ curQuarter: 1, curTime: 0 });
  return (
    <CupRecordContext.Provider value={{ time, setTime, teamsRecord, loading }}>
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordTime = () => useContext(CupRecordContext).time;
export const useSetRecordTime = () => useContext(CupRecordContext).setTime;
export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
