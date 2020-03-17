import React, { useContext, useState } from "react";
import { useLoadCupRecord, usePosition } from "../../hooks/cups";
import {
  TeamsRecord,
  TeamsPos,
  Log,
  Substitution
} from "../../helpers/Firebase/game";
import { firestore } from "firebase";

export interface CurTime {
  curQuarter: number;
  curTime: number;
}

interface CupRecordData {
  time: CurTime;
  setTime: React.Dispatch<React.SetStateAction<CurTime>>;
  loading: boolean;
  teamsRecord: TeamsRecord;
  pos: Substitution;
  setPos: React.Dispatch<React.SetStateAction<Substitution>>;
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

  const [pos, setPos] = useState<Substitution>({
    Q0010: {
      log: {
        createdBy: "tester",
        timeStamp: firestore.Timestamp.now()
      },
      player_curPosition: {
        "0": "test",
        "1": "test1",
        "3": "test2",
        "4": "test3"
      }
    },
    Q00311100: {
      log: {
        createdBy: "tester",
        timeStamp: firestore.Timestamp.now()
      },
      player_curPosition: {
        "0": "test",
        "1": "test1",
        "3": "test2",
        "4": "test3"
      }
    },
    Q0030: {
      log: {
        createdBy: "tester",
        timeStamp: firestore.Timestamp.now()
      },
      player_curPosition: {
        "5": "test",
        "6": "test1",
        "7": "test2",
        "8": "test3"
      }
    }
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

// 삭제
export const useRecordTime = () => useContext(CupRecordContext).time;
export const useSetRecordTime = () => useContext(CupRecordContext).setTime;

export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
export const useTeamPos = () => useContext(CupRecordContext).pos;
export const useSetTeamPos = () => useContext(CupRecordContext).setPos;

export const useSelUsr = () => useContext(CupRecordContext).selUsr;
export const useSetSelUsr = () => useContext(CupRecordContext).setSetUsr;

export const makeQuarterString = (curTime: CurTime) => {
  const qString: string = "Q" + curTime.curQuarter.toString().padStart(3, "0");
  const tString: string = (curTime.curTime * 1000).toString();
  return qString + tString;
};

export const deepCopySubstitution = (data: Substitution): Substitution => {
  const newTeamRealPos: Substitution = JSON.parse(JSON.stringify(data));
  Object.keys(newTeamRealPos).forEach((value: string) => {
    // cast object
    if (newTeamRealPos[value])
      newTeamRealPos[value].log.timeStamp = firestore.Timestamp.fromMillis(
        data[value].log.timeStamp.toMillis()
      );
  });

  return newTeamRealPos;
};
