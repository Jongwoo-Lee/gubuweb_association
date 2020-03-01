import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";

export interface PreDataStructure {
  [group: number]: { [order: number]: string | null };
}

export interface FinalDataStructure {
  order: Array<string>;
  round: number;
}

interface CupTreeData {
  teams: string[]; // team name
  preTeams: PreDataStructure; // Map<number, Map<number, string>>; // mainKey : group, subkey : order in group
  setPreTeams: Dispatch<SetStateAction<PreDataStructure>>;
  // setPreTeams: Dispatch<SetStateAction<Map<number, Map<number, string>>>>;

  finalTeams: FinalDataStructure; // team name
  setFinalTeams: Dispatch<SetStateAction<FinalDataStructure>>;
}

export const ModCupTreeContext: React.Context<CupTreeData> = React.createContext<
  CupTreeData
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

export const ModCupTreeProvider = (props: {
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

  const [preTeams, setPreTeams] = useState<PreDataStructure>({});
  const [finalTeams, setFinalTeams] = useState<FinalDataStructure>({
    order: Array<string>(8),
    round: 8
  });

  return (
    <ModCupTreeContext.Provider
      value={{ teams, preTeams, setPreTeams, finalTeams, setFinalTeams }}
    >
      {props.children}
    </ModCupTreeContext.Provider>
  );
};

export const useAttendTeams = () => useContext(ModCupTreeContext).teams;
export const usePreTeams = () => useContext(ModCupTreeContext).preTeams;
export const useSetPreTeams = () => useContext(ModCupTreeContext).setPreTeams;
export const useFinalTeams = () => useContext(ModCupTreeContext).finalTeams;
export const useSetFinalTeams = () =>
  useContext(ModCupTreeContext).setFinalTeams;
