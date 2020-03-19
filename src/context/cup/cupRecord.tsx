import React, { useContext, useState } from "react";
import {
  useLoadCupRecord,
  useMakeTempSubData,
  TempSubData
} from "../../hooks/cups";
import { TeamsRecord, Substitution, Goal } from "../../helpers/Firebase/game";
import { firestore } from "firebase";

export interface CurTime {
  curQuarter: number;
  curTime: number;
}

interface CupRecordData {
  loading: boolean;
  teamsRecord: TeamsRecord;
  pos: Substitution;
  setPos: React.Dispatch<React.SetStateAction<Substitution>>;
  tempSubData: Array<TempSubData>;
  //
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  loading: false,
  teamsRecord: new TeamsRecord(),
  pos: {},
  setPos: () => {
    console.log("setPos is not initilized");
  },
  tempSubData: [],
  goals: [],
  setGoals: () => {
    console.log("setScoreList is not initilized");
  }
});

export const CupRecordProvider = (props: {
  children: React.ReactNode;
  cupID: string;
  gameID: string;
}) => {
  const { teamsRecord, loading } = useLoadCupRecord(props.cupID, props.gameID);
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
    Q0031110000: {
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
  const tempSubData = useMakeTempSubData(pos);

  const [goals, setGoals] = useState<Goal[]>([]);
  return (
    <CupRecordContext.Provider
      value={{
        teamsRecord,
        loading,
        pos,
        setPos,
        tempSubData,
        goals,
        setGoals
      }}
    >
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
export const useTeamPos = () => useContext(CupRecordContext).pos;
export const useSetTeamPos = () => useContext(CupRecordContext).setPos;
export const useTempSubData = () => useContext(CupRecordContext).tempSubData;

export const useGoals = () => useContext(CupRecordContext).goals;
export const useSetGoals = () => useContext(CupRecordContext).setGoals;

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
