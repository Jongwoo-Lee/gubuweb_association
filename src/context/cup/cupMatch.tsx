import React, { useContext, useState, Dispatch, SetStateAction } from "react";
import { CupInfo } from "../../helpers/Firebase/cup";
import { COL_CUP } from "../../constants/firestore";
// import { COL_CUP } from "../../constants/firestore";

export interface CupMatchInfo {
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

export const fromMatchInfo = (matchInfo?: CupMatchInfo): CupMatchInfo => {
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
      const saves: CupMatchInfo = props.cupInfo.matchInfo as CupMatchInfo;

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

export const convertGroupString = (num: number): string => {
  let cStr: string = "";
  switch (num) {
    case 0:
      cStr = "A";
      break;
    case 1:
      cStr = "B";
      break;
    case 2:
      cStr = "C";
      break;
    case 3:
      cStr = "D";
      break;
    case 4:
      cStr = "E";
      break;
    case 5:
      cStr = "F";
      break;
    case 6:
      cStr = "G";
      break;
    case 7:
      cStr = "H";
      break;
    case 8:
      cStr = "I";
      break;
    case 9:
      cStr = "J";
      break;
    case 10:
      cStr = "K";
      break;
    case 11:
      cStr = "L";
      break;
    case 12:
      cStr = "M";
      break;
    case 13:
      cStr = "N";
      break;
  }

  return cStr;
};

// 4강 기준으로 토너먼트 규칙 정리

// Card id 규칙 정리
// id == 1 => 3,4위전 2 ^ 0
// id == 2 => 결승    2 ^ 1
// id == 3,4 => 준결승2 ^ 1 ~ 2 ^ 2

// 토너먼트에 팀 배치 규칙 정리
// id == 8,7 ==> Card 4에 배치, 승자를 id == 4에 저장, 패자를 id == 2에 저장
// id == 6,5 ==> Card 3에 배치, 승자를 id == 3에 저장, 패자를 id == 1에 저장
// id == 4,3 ==> Card 2에 배치(결승)
// id == 2,1 ==> Card 1에 배치(3,4위)
// 결과는 따른곳에 저장..
// 2위와 4위 등은 결승 혹은 준결승에서 패배자가 자동으로 되는 것임

export const convertFinalCardString = (id: number): string => {
  let cStr: string = "";
  if (id < 3) {
    if (id === 2) cStr = "결승전";
    else cStr = "3, 4위전";
  } else {
    let find = 0;

    while (!(Math.pow(2, find) < id && Math.pow(2, find + 1) >= id)) {
      find++;
      if (find > 7) {
        cStr = "";
        break;
      }
    }
    const findGame = (find: number, id: number): string =>
      `${Math.pow(2, find + 1) - id + 1}경기`;
    // find == 0 (1 2) -> id 2
    // find == 1 (2 4)-> id 3 4
    // find == 2 (4 8)-> id 5 6 7 8
    switch (find) {
      case 1:
        cStr = `4강 - ${findGame(find, id)}`;
        break;
      case 2:
        cStr = `8강 - ${findGame(find, id)}`;
        break;
      case 3:
        cStr = `16강 - ${findGame(find, id)}`;
        break;
      case 4:
        cStr = `32강 - ${findGame(find, id)}`;
        break;
      case 5:
        cStr = `64강 - ${findGame(find, id)}`;
        break;
    }
  }

  return cStr;
};
