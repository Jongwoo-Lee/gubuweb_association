import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";
import { PlanFinal } from "../../../context/cup/cup";
import { ExitWithID, convertKoTime } from "./DatePickerDlg";
import { PlanCard } from "./PlanCard";
import { SubGameInfo } from "../../../context/game/game";
import { firestore } from "firebase";

const useStyles = makeStyles({
  panel: {
    width: "90%",
    margin: "10px"
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
  const title: number = Math.pow(2, cardId + 1);

  const setClose = (obj: ExitWithID) => {
    let newPlan: PlanFinal = JSON.parse(JSON.stringify(planFinal));

    if (!newPlan)
      newPlan = { gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 } };
    if (!newPlan[obj.id]) newPlan[obj.id] = {};

    newPlan[obj.id].kt = firestore.Timestamp.fromDate(
      new Date(obj.date.toJSON())
    );

    setPlanFinal(newPlan);
  };

  const setLocation = (location: string, id: number) => {
    let newPlan: PlanFinal = JSON.parse(JSON.stringify(planFinal));
    if (!newPlan)
      newPlan = { gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 } };
    if (!newPlan[id]) newPlan[id] = {};
    newPlan[id].lo = location;

    setPlanFinal(newPlan);
  };

  // 요건 자동 저장한다.
  const setGameUID = (gameUID: string, id: number) => {
    let newPlan: PlanFinal = JSON.parse(JSON.stringify(planFinal));

    if (!newPlan)
      newPlan = { gameInfo: { numOfQuarter: 2, gameTime: 45, restTime: 15 } };
    if (!newPlan[id]) newPlan[id] = { gid: gameUID };
    newPlan[id].gid = gameUID;

    setPlanFinal(newPlan);
  };

  const createCard = () => {
    const arr: Array<SubGameInfo> = [];
    let subGameId: number = title;
    let findTeam = Math.pow(2, cardId + 2);
    // console.dir(planFinal);
    for (let i = 0; i < Math.pow(2, cardId); i++) {
      let team1: string = "";
      let team2: string = "";
      if (planFinal.t) {
        team1 = planFinal.t[findTeam--];
        team2 = planFinal.t[findTeam--];
      } else {
        findTeam -= 2;
      }

      const location: string =
        planFinal[subGameId] && planFinal[subGameId].lo
          ? planFinal[subGameId].lo ?? ""
          : "";

      const time: firestore.Timestamp | undefined =
        planFinal[subGameId] && planFinal[subGameId].kt
          ? planFinal[subGameId].kt ?? undefined
          : undefined;

      arr.push({
        team1: team1,
        team2: team2,
        id: subGameId,
        location: location,
        kickOffTime: time
      });
      subGameId--;
    }

    return arr;
  };

  return (
    <ExpansionPanel className={classes.panel}>
      <ExpansionPanelSummary
        // expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" color="textPrimary" variant="h6">
          {title >= 4 ? `${title}강` : "결승전"}
        </Typography>
      </ExpansionPanelSummary>

      {createCard().map((value: SubGameInfo, index: number) => {
        let time: string = "";
        // TypeScript에서 firebase timeStamp와 Date 타입체크 버그가 있고
        // 자바스크립트로 오브젝트의 타입이 timeStamp인지 Date인지 체크가 안됨.... 음..
        // if (typeof value?.kickOffTime !== "undefined") {
        if (
          (value?.kickOffTime ?? false) &&
          typeof value?.kickOffTime !== "undefined"
        ) {
          time = convertKoTime(value?.kickOffTime.toDate());
        }
        const location: string =
          planFinal && planFinal[value.id] && planFinal[value.id].lo
            ? planFinal[value.id].lo ?? "" // 위에서 null check가 원래는 되야 하는데 typescript 빈틈인듯
            : "";

        return (
          <PlanCard
            title={`${title} - ${index + 1}경기`}
            id={value.id}
            team1UID={value.team1}
            team2UID={value.team2}
            location={location}
            kickOffTime={time}
            handleOnLocation={setLocation}
            handleOnClose={setClose}
            handleOnSetGameUID={setGameUID}
            round={value.id}
          />
        );
      })}
    </ExpansionPanel>
  );
};
