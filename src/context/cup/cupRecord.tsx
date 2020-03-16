import React, { useContext, useState } from "react";
import { useLoadCupRecord } from "../../hooks/cups";
import { TeamsRecord, TeamsPos } from "../../helpers/Firebase/game";

export interface CurTime {
  curQuarter: number;
  curTime: number;
}

interface CupRecordData {
  time: CurTime;
  setTime: React.Dispatch<React.SetStateAction<CurTime>>;
  loading: boolean;
  teamsRecord: TeamsRecord;
  pos: TeamsPos;
  setPos: React.Dispatch<React.SetStateAction<TeamsPos>>;
  selUsr: number;
  setSetUsr: React.Dispatch<React.SetStateAction<number>>;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  time: { curQuarter: 1, curTime: 0 },
  setTime: () => {
    console.log("setTime is not initilized");
  },
  loading: false,
  teamsRecord: new TeamsRecord(),
  pos: {},
  setPos: () => {
    console.log("setPos is not initilized");
  },
  selUsr: -1,
  setSetUsr: () => {
    console.log("setSetUsr is not initilized");
  }
});

export const CupRecordProvider = (props: {
  children: React.ReactNode;
  cupID: string;
  gameID: string;
}) => {
  const { teamsRecord, loading } = useLoadCupRecord(props.cupID, props.gameID);
  const [time, setTime] = useState<CurTime>({ curQuarter: 1, curTime: 0 });
  const [pos, setPos] = useState<TeamsPos>({
    0: "test",
    1000: "test1",
    1001: "test2",
    1002: "test3",
    1003: "test4"
  });
  const [selUsr, setSetUsr] = useState<number>(-1);

  return (
    <CupRecordContext.Provider
      value={{
        time,
        setTime,
        teamsRecord,
        loading,
        pos,
        setPos,
        selUsr,
        setSetUsr
      }}
    >
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordTime = () => useContext(CupRecordContext).time;
export const useSetRecordTime = () => useContext(CupRecordContext).setTime;
export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
export const useTeamPos = () => useContext(CupRecordContext).pos;
export const useSetTeamPos = () => useContext(CupRecordContext).setPos;

export const useSelUsr = () => useContext(CupRecordContext).selUsr;
export const useSetSelUsr = () => useContext(CupRecordContext).setSetUsr;
