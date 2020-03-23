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
import { useCurCupID } from "../../../context/cup/cup";
import { saveGameUID, saveGameFinalData } from "../../../helpers/Firebase/cup";
import { Grid, Button } from "@material-ui/core";
import { convertFinalCardString } from "../../../context/cup/cupMatch";

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
  BtnID: number;
  planFinal: PlanFinal;
  setPlanFinal: React.Dispatch<React.SetStateAction<PlanFinal>>;
}

export const PlanFinalCards: React.FC<PlanFinalCardProps> = ({
  BtnID,
  planFinal,
  setPlanFinal
}: PlanFinalCardProps) => {
  const classes = useStyles();
  const cupID: string | undefined = useCurCupID();

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
  const setGameUID = async (gameUID: string, id: number) => {
    let newPlan: PlanFinal = PlanDeepCopy(planFinal, true);

    if (!newPlan) newPlan = { gI: { nQ: 2, gT: 45, rT: 15 } };
    if (!newPlan[id]) newPlan[id] = { gid: gameUID };
    newPlan[id].gid = gameUID;

    if (typeof cupID !== "undefined")
      await saveGameUID(cupID, gameUID, id, newPlan.gI);

    setPlanFinal(newPlan);
  };

  const saveFinalCards = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const saveArr: Array<number> = [];

    if (BtnID !== 0) {
      for (let i = Math.pow(2, BtnID); i > Math.pow(2, BtnID - 1); i--) {
        saveArr.push(i);
      }
    } else saveArr.push(1);

    const data: PlanFinal = { gI: planFinal.gI };
    saveArr.forEach((value: number) => {
      if (typeof planFinal[value] !== "undefined" || planFinal[value])
        data[value] = planFinal[value];
    });
    if (typeof cupID !== "undefined") {
      await saveGameFinalData(cupID, data);
    }
  };

  const createCard = () => {
    const arr: Array<GameCard> = [];
    let subGameId: number = Math.pow(2, BtnID);
    if (BtnID !== 0) {
      const next: number = Math.pow(2, BtnID - 1); //
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
            planFinal.gI.nQ,
            planFinal.gI.gT,
            planFinal.gI.rT,
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
          planFinal.gI.nQ,
          planFinal.gI.gT,
          planFinal.gI.rT,
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
            gameCard={value}
          />
        );
      })}
      <Grid container direction="row">
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={saveFinalCards}
          >{`${convertFinalCardString(Math.pow(2, BtnID), true)} 저장`}</Button>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
};
