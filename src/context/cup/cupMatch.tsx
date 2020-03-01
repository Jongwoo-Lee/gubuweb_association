import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { COL_CUP } from "../../constants/firestore";
// import { COL_CUP } from "../../constants/firestore";

export interface FirebaseSaveStructure {
  // readonly [COL_CUP.FINAL]: FinalDataStructure;
  // readonly [COL_CUP.PRELIMINARY]: PreDataStructure;
  f: FinalDataStructure; // COL_CUP.FINAL
  p: PreDataStructure; // COL_CUP.PRELIMINARY
}

export interface PreDataStructure {
  [group: number]: { [order: number]: string | null };
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
  }
});

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

  let initialPData: PreDataStructure = {};
  let initialFData: FinalDataStructure = {
    order: new Array<string | null>(8).fill(null),
    round: 8
  };
  if (typeof props.cupInfo !== "undefined") {
    if (props.cupInfo.matchInfo !== null) {
      const matchInfo: FirebaseSaveStructure = props.cupInfo
        .matchInfo as FirebaseSaveStructure;

      //set final data
      if (matchInfo.f !== null) {
        initialFData.round = matchInfo.f.round;
        if (matchInfo.f.order !== null) {
          initialFData.order = Array.from(matchInfo.f.order);
        }
      }

      //set preliminary data
      if (matchInfo.p !== null) {
        initialPData = matchInfo.p;
      }
    }
  }

  const [preTeams, setPreTeams] = useState<PreDataStructure>(initialPData);
  const [finalTeams, setFinalTeams] = useState<FinalDataStructure>(
    initialFData
  );

  return (
    <EditCupMatchContext.Provider
      value={{ teams, preTeams, setPreTeams, finalTeams, setFinalTeams }}
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
