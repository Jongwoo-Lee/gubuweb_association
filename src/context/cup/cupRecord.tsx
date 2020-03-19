import React, { useContext, useState } from "react";
import {
  useLoadCupRecord,
  useMakeTempSubData,
  TempSubData
} from "../../hooks/cups";
import {
  TeamsRecord,
  Substitution,
  Goal,
  Log
} from "../../helpers/Firebase/game";
import { firestore } from "firebase";
import { GameCard } from "../game/game";

export interface CurTime {
  curQuarter: number;
  curTime: number;
}
interface RecordStack {
  [teamUID: string]: RecordDetailData;
}

interface RecordDetailData {
  pos: Substitution;
  setPos: React.Dispatch<React.SetStateAction<Substitution>>;
  tempSubData: Array<TempSubData>;
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

interface CupRecordData {
  loading: boolean;
  teamsRecord: TeamsRecord;
  curTeam: string;
  setCurTeam: React.Dispatch<React.SetStateAction<string>>;
  recordStack: RecordStack;
  // pos: Substitution;
  // setPos: React.Dispatch<React.SetStateAction<Substitution>>;
  // tempSubData: Array<TempSubData>;
  // goals: Goal[];
  // setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  loading: false,
  teamsRecord: new TeamsRecord(),
  curTeam: "team1", // or  team2 UID
  setCurTeam: () => {
    console.log(`setCurTeam`);
  },
  recordStack: {}
});

export const CupRecordProvider = (props: {
  children: React.ReactNode;
  cupID: string;
  gameCard: GameCard;
}) => {
  const { teamsRecord, loading } = useLoadCupRecord(
    props.cupID,
    props.gameCard?.gid ?? ""
  ); // gid는 undefined일 수 없음

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
  const [pos2, setPos2] = useState<Substitution>({
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
  const tempSubData2 = useMakeTempSubData(pos2);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [goals2, setGoals2] = useState<Goal[]>([]);

  const [curTeam, setCurTeam] = useState(props.gameCard.team1 ?? "team1");
  return (
    <CupRecordContext.Provider
      value={{
        teamsRecord,
        loading,
        curTeam,
        setCurTeam,
        recordStack: {
          [props.gameCard.team1 ?? "team1"]: {
            pos,
            setPos,
            tempSubData,
            goals,
            setGoals
          },
          [props.gameCard.team2 ?? "team2"]: {
            pos: pos2,
            setPos: setPos2,
            tempSubData: tempSubData2,
            goals: goals2,
            setGoals: setGoals2
          }
        }
      }}
    >
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useCurTeam = () => useContext(CupRecordContext).curTeam;
export const useSetCurTeam = () => useContext(CupRecordContext).setCurTeam;
export const useTeamRecord = () => useContext(CupRecordContext).teamsRecord;
export const useTeamRecordStack = () =>
  useContext(CupRecordContext).recordStack;
// export const useTeamPos = () => useContext(CupRecordContext).pos;
// export const useSetTeamPos = () => useContext(CupRecordContext).setPos;
// export const useTempSubData = () => useContext(CupRecordContext).tempSubData;

// export const useGoals = () => useContext(CupRecordContext).goals;
// export const useSetGoals = () => useContext(CupRecordContext).setGoals;

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

export const deepCopyGoals = (data: Goal[]): Goal[] => {
  const newGoals: Goal[] = JSON.parse(JSON.stringify(data));

  newGoals.forEach((value: Goal) => {
    value.log.timeStamp = firestore.Timestamp.fromMillis(
      (value.log as Log).timeStamp.seconds * 1000
    );
  });

  return newGoals;
};
