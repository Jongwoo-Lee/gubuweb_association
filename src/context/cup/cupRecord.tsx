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
    0: "test1",
    1: "test2",
    2: "test3",
    3: "test4"
  });

  return (
    <CupRecordContext.Provider
      value={{ time, setTime, teamsRecord, loading, pos, setPos }}
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
