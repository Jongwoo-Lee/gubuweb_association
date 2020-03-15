import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  PlanFinal,
  parseLocation,
  parseGameUID,
  parseTimeStamp,
  PlanDeepCopy,
  parseWinner,
  parseScore,
  Score
} from "../../../context/cup/cupPlan";
import { ExitWithID } from "./DatePickerDlg";
import { PlanCard } from "./PlanCard";
import { GameCard } from "../../../context/game/game";
import { firestore } from "firebase";

const useStyles = makeStyles({
  panel: {
    width: "90%",
    margin: "10px"
  },
  item: {
    width: "70%"
  }
});

export interface PlanFinalCardProps {
  cardId: number;
  planFinal: PlanFinal;
  setPlanFinal: React.Dispatch<React.SetStateAction<PlanFinal>>;
}

export const PlanFinalCards: React.FC<PlanFinalCardProps> = ({
  cardId,
  planFinal,
  setPlanFinal
}: PlanFinalCardProps) => {
  const classes = useStyles();

  const setClose = (obj: ExitWithID) => {
    let newPlan: PlanFinal = PlanDeepCopy(planFinal, true);

    if (!newPlan) newPlan = { gI: { nQ: 2, gT: 45, rT: 15 } };
    if (!newPlan[obj.id]) newPlan[obj.id] = {};

    if (typeof obj.date !== "undefined")
      newPlan[obj.id].kt = firestore.Timestamp.fromMillis(
        obj.date.seconds * 1000
      );

    setPlanFinal(newPlan);
  };

  const setLocation = (location: string, id: number) => {
    let newPlan: PlanFinal = PlanDeepCopy(planFinal, true);
    if (!newPlan) newPlan = { gI: { nQ: 2, gT: 45, rT: 15 } };
    if (!newPlan[id]) newPlan[id] = {};
    newPlan[id].lo = location;

    setPlanFinal(newPlan);
  };

  // 요건 자동 저장한다.
  const setGameUID = (gameUID: string, id: number) => {
    let newPlan: PlanFinal = PlanDeepCopy(planFinal, true);

    if (!newPlan) newPlan = { gI: { nQ: 2, gT: 45, rT: 15 } };
    if (!newPlan[id]) newPlan[id] = { gid: gameUID };
    newPlan[id].gid = gameUID;

    setPlanFinal(newPlan);
  };

  const createCard = () => {
    const arr: Array<GameCard> = [];
    let subGameId: number = Math.pow(2, cardId);
    if (cardId !== 0) {
      const next: number = Math.pow(2, cardId - 1); //
      for (let i = subGameId; i > next; i--) {
        let team1: string = "";
        let team2: string = "";
        if (planFinal.t) {
          team1 = planFinal.t[i * 2];
          team2 = planFinal.t[i * 2 - 1];
        }

        const location: string = parseLocation(planFinal, i);
        const gameUID: string | undefined = parseGameUID(planFinal, i);
        const time: firestore.Timestamp | undefined = parseTimeStamp(
          planFinal,
          i
        );

        const winner: string | undefined = parseWinner(planFinal, i);
        const score: Score | undefined = parseScore(planFinal, i);

        arr.push(
          new GameCard(
            team1,
            team2,
            i,
            undefined,
            undefined,
            location,
            time ? firestore.Timestamp.fromMillis(time.seconds * 1000) : time,
            undefined,
            score,
            winner,
            gameUID
          )
        );
      }
    } else {
      // 3,4위전 카드 생성
      let team1: string = "";
      let team2: string = "";
      if (planFinal.t) {
        team1 = planFinal.t[2] ?? "";
        team2 = planFinal.t[1] ?? "";
      }

      const location: string = parseLocation(planFinal, subGameId);
      const gameUID: string | undefined = parseGameUID(planFinal, subGameId);
      const time: firestore.Timestamp | undefined = parseTimeStamp(
        planFinal,
        subGameId
      );

      const winner: string | undefined = parseWinner(planFinal, subGameId);
      const score: Score | undefined = parseScore(planFinal, subGameId);

      arr.push(
        new GameCard(
          team1,
          team2,
          subGameId,
          undefined,
          undefined,
          location,
          time ? firestore.Timestamp.fromMillis(time.seconds * 1000) : time,
          undefined,
          score,
          winner,
          gameUID
        )
      );
    }

    return arr;
  };

  return (
    <div className={classes.item}>
      {createCard().map((value: GameCard, index: number) => {
        // TypeScript에서 firebase timeStamp와 Date 타입체크 버그가 있고
        // 자바스크립트로 오브젝트의 타입이 timeStamp인지 Date인지 체크가 안됨.... 음..
        // if (typeof value?.kickOffTime !== "undefined") {
        // if (
        //   (value?.kickOffTime ?? false) &&
        //   typeof value?.kickOffTime !== "undefined"
        // ) {
        //   time = convertKoTime(value?.kickOffTime.toDate());
        // }

        return (
          <PlanCard
            key={index}
            handleOnLocation={setLocation}
            handleOnClose={setClose}
            handleOnSetGameUID={setGameUID}
            gameInfo={value}
          />
        );
      })}
    </div>
  );
};
