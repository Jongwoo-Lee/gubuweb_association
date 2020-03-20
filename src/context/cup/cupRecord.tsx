import React, { useContext, useState } from "react";
import { useLoadCupRecord, TempSubData } from "../../hooks/cups";
import { Substitution, Goal, Log } from "../../helpers/Firebase/game";
import { firestore } from "firebase";
import { GameCard } from "../game/game";

export interface CurTime {
  curQuarter: number;
  curTime: number;
}
export interface RecordStack {
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
  curTeam: string;
  setCurTeam: React.Dispatch<React.SetStateAction<string>>;
  recordStack: RecordStack;
}

export const CupRecordContext: React.Context<CupRecordData> = React.createContext<
  CupRecordData
>({
  loading: false,
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
  const [recordStack, loading] = useLoadCupRecord(props.cupID, props.gameCard);
  const [curTeam, setCurTeam] = useState(props.gameCard.team1 ?? "team1");
  return (
    <CupRecordContext.Provider
      value={{
        loading,
        curTeam,
        setCurTeam,
        recordStack
      }}
    >
      {props.children}
    </CupRecordContext.Provider>
  );
};

export const useRecordloading = () => useContext(CupRecordContext).loading;
export const useCurTeam = () => useContext(CupRecordContext).curTeam;
export const useSetCurTeam = () => useContext(CupRecordContext).setCurTeam;
export const useTeamRecordStack = () =>
  useContext(CupRecordContext).recordStack;

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
