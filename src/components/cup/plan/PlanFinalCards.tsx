import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  PlanFinal,
  parseLocation,
  parseGameUID,
  parseTimeStamp,
  PlanDeepCopy
} from "../../../context/cup/cup";
import { ExitWithID } from "./DatePickerDlg";
import { PlanCard } from "./PlanCard";
import { SubGameInfo } from "../../../context/game/game";
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
    const arr: Array<SubGameInfo> = [];
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

        arr.push({
          team1: team1,
          team2: team2,
          id: i,
          location: location,
          kickOffTime: time
            ? firestore.Timestamp.fromMillis(time.seconds * 1000)
            : time,
          gid: gameUID
        });
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

      arr.push({
        team1: team1,
        team2: team2,
        id: subGameId,
        location: location,
        kickOffTime: time
          ? firestore.Timestamp.fromMillis(time.seconds * 1000)
          : time,
        gid: gameUID
      });
    }

    return arr;
  };

  return (
    <div className={classes.item}>
      {createCard().map((value: SubGameInfo, index: number) => {
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
