import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";

interface CupTreeData {
  teams: string[]; // team name
  preTeams: string[]; // team name
  finalTeams: string[]; // team name
  setPreTeams: Dispatch<SetStateAction<string[]>>;
  setFinalTeams: Dispatch<SetStateAction<string[]>>;
}

export const ModCupTreeContext: React.Context<CupTreeData> = React.createContext<
  CupTreeData
>({
  teams: [],
  preTeams: [],
  setPreTeams: () => {
    console.log("preTeam is not yet set");
  },

  finalTeams: [],
  setFinalTeams: () => {
    console.log("finalTeam is not yet set");
  }
});

export const ModCupTreeProvider = (props: {
  children: React.ReactNode;
  cupInfo: CupInfo | undefined;
}) => {
  // console.log(`Poriver - ${props.cupInfo}`);
  // console.dir(props.cupInfo);
  // const cupContextValue = useCupInfoList(props.cupInfo);

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

  const [preTeams, setPreTeams] = useState<string[]>([]);
  const [finalTeams, setFinalTeams] = useState<string[]>([]);

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
