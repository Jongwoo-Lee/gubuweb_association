import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { COL_CUP } from "../../constants/firestore";
// import { COL_CUP } from "../../constants/firestore";

export interface FirebaseSaveStructure {
  // readonly [COL_CUP.FINAL]: FinalDataStructure;
  // readonly [COL_CUP.PRELIMINARY]: PreDataStructure;
  f: FinalDataStructure; // COL_CUP.FINAL
  p: PreDataStructure; // COL_CUP.PRELIMINARY
  ro: number; // COL_CUP.ROUND
  w: number; // COL_CUP.WILDCARD
}

export interface PreDataStructure {
  [group: number]: { [order: number]: string | null; t: number; ft: number }; // t => COL_CUP.TEAMS, ft=> COL_CUP.FINALTEAM
}

// Object 에 저장할 때
export interface FinalDataStructure {
  order: Array<string | null>;
  round: number;
}

interface CupMatchData {
  teams: string[]; // team name
  preTeams: PreDataStructure; // Map<number, Map<number, string>>; // mainKey : group, subkey : order in group
  setPreTeams: Dispatch<SetStateAction<PreDataStructure>>;
  // setPreTeams: Dispatch<SetStateAction<Map<number, Map<number, string>>>>;

  finalTeams: FinalDataStructure; // team name
  setFinalTeams: Dispatch<SetStateAction<FinalDataStructure>>;

  round: number;
  setRound: Dispatch<SetStateAction<number>>;

  numOfWild: number;
  setNumOfWild: Dispatch<SetStateAction<number>>;
}

export const EditCupMatchContext: React.Context<CupMatchData> = React.createContext<
  CupMatchData
>({
  teams: [],
  preTeams: {},
  setPreTeams: () => {
    console.log("preTeam is not yet set");
  },

  finalTeams: { order: Array<string>(8), round: 8 },
  setFinalTeams: () => {
    console.log("finalTeam is not yet set");
  },
  round: 1,
  setRound: () => {
    console.log("user for round and numOfWild");
  },
  numOfWild: 1,
  setNumOfWild: () => {
    console.log("user for round and wildCard");
  }
});

export const fromMatchInfo = (
  matchInfo?: FirebaseSaveStructure
): FirebaseSaveStructure => {
  let iPData: PreDataStructure = {};
  let iFData: FinalDataStructure = {
    order: new Array<string | null>(8).fill(null),
    round: 8
  };
  let iNumOfRound: number = 1;
  let iNumOfWild: number = 1;
  if (matchInfo) {
    if (matchInfo.f !== null) {
      iFData.round = matchInfo.f.round;
      if (matchInfo.f.order !== null) {
        iFData.order = Array.from(matchInfo.f.order);
      }
    }

    //set preliminary data
    if (matchInfo.p !== null) {
      iPData = matchInfo.p;
    }
    if (matchInfo.ro !== null) {
      iNumOfRound = matchInfo.ro;
    }
    if (matchInfo.w !== null) {
      iNumOfWild = matchInfo.w;
    }
  }

  return { p: iPData, f: iFData, ro: iNumOfRound, w: iNumOfWild };
};

export const EditCupMatchProvider = (props: {
  children: React.ReactNode;
  cupInfo: CupInfo | undefined;
}) => {
  // get from cupInfo 추가해야 함

  const [teams, setTeams] = useState<string[]>([
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8"
  ]);

  // initial value with undefined
  let matchInfo = fromMatchInfo();

  if (typeof props.cupInfo !== "undefined") {
    if (props.cupInfo.matchInfo !== null) {
      const saves: FirebaseSaveStructure = props.cupInfo
        .matchInfo as FirebaseSaveStructure;

      // load things
      matchInfo = fromMatchInfo(saves);
    }
  }

  const [preTeams, setPreTeams] = useState<PreDataStructure>(matchInfo.p);
  const [finalTeams, setFinalTeams] = useState<FinalDataStructure>(matchInfo.f);
  const [round, setRound] = useState<number>(matchInfo.ro);
  const [numOfWild, setNumOfWild] = useState<number>(matchInfo.w);

  return (
    <EditCupMatchContext.Provider
      value={{
        teams,
        preTeams,
        setPreTeams,
        finalTeams,
        setFinalTeams,
        round,
        setRound,
        numOfWild,
        setNumOfWild
      }}
    >
      {props.children}
    </EditCupMatchContext.Provider>
  );
};

export const useAttendTeams = () => useContext(EditCupMatchContext).teams;
export const usePreTeams = () => useContext(EditCupMatchContext).preTeams;
export const useSetPreTeams = () => useContext(EditCupMatchContext).setPreTeams;
export const useFinalTeams = () => useContext(EditCupMatchContext).finalTeams;
export const useSetFinalTeams = () =>
  useContext(EditCupMatchContext).setFinalTeams;

export const useRound = () => useContext(EditCupMatchContext).round;
export const useSetRound = () => useContext(EditCupMatchContext).setRound;

export const useNumOfWild = () => useContext(EditCupMatchContext).numOfWild;
export const useSetNumOfWild = () =>
  useContext(EditCupMatchContext).setNumOfWild;
