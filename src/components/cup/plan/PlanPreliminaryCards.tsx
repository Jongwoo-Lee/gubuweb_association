import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary
} from "@material-ui/core";
import { convertString, PreDataStructure } from "../../../context/cup/cupMatch";
import { PlanPreliminary } from "../../../context/cup/cup";
import { ExitWithID, convertKoTime } from "./DatePickerDlg";
import { PlanCard } from "./PlanCard";

interface SubGameInfo {
  // [No: number]: string | null; // 4조(group) - 1 (No)
  team1: string | null;
  team1No: number;
  team2: string | null;
  team2No: number;
  location?: string;
  kickOffTime?: string;
  id: number;
}

const useStyles = makeStyles({
  panel: {
    width: "90%",
    margin: "10px"
  }
});

export interface PlanPreliminaryCardProps {
  group: number;
  preliminaryData: PreDataStructure;
  round: number;
  planPre: PlanPreliminary;
  setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
}

export const PlanPreliminaryCards: React.FC<PlanPreliminaryCardProps> = ({
  group,
  preliminaryData,
  round,
  planPre,
  setPlanPre
}: PlanPreliminaryCardProps) => {
  const classes = useStyles();
  const numOfTeams: number = preliminaryData[group].t;

  const setClose = (obj: ExitWithID) => {
    const newPlan: PlanPreliminary = JSON.parse(JSON.stringify(planPre));

    if (!newPlan[group]) newPlan[group] = {};
    if (!newPlan[group][obj.id])
      newPlan[group][obj.id] = { kt: null, lo: null };

    newPlan[group][obj.id].kt = obj.date?.toJSON() ?? null;

    setPlanPre(newPlan);
  };

  const setLocation = (location: string, id: number) => {
    const newPlan: PlanPreliminary = JSON.parse(JSON.stringify(planPre));
    if (!newPlan[group]) newPlan[group] = {};
    if (!newPlan[group][id]) newPlan[group][id] = { kt: null, lo: null };
    newPlan[group][id].lo = location;

    setPlanPre(newPlan);
  };

  const createCard = () => {
    const arr: Array<SubGameInfo> = [];
    let subGameId = 0;
    for (let ro: number = 0; ro < round; ro++)
      for (let i: number = 0; i < numOfTeams - 1; i++) {
        for (let j: number = i + 1; j < numOfTeams; j++) {
          const location: string =
            planPre[group] &&
            planPre[group][subGameId] &&
            planPre[group][subGameId].lo
              ? planPre[group][subGameId].lo ?? "" // 위에서 null check가 원래는 되야 하는데 typescript 빈틈인듯
              : "";

          const time: string | null =
            planPre[group] &&
            planPre[group][subGameId] &&
            planPre[group][subGameId].kt
              ? planPre[group][subGameId].kt ?? null
              : null;

          arr.push({
            team1: preliminaryData[group][i] ?? null,
            team1No: i + 1,
            team2: preliminaryData[group][j] ?? null,
            team2No: j + 1,
            id: subGameId,
            location: location,
            kickOffTime: time ?? undefined
          });
          subGameId++;
        }
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
          {convertString(group)}조
        </Typography>
      </ExpansionPanelSummary>

      {createCard().map((value: SubGameInfo, index: number) => {
        let time: string = value?.kickOffTime
          ? convertKoTime(value?.kickOffTime)
          : "시간 설정";
        const location: string =
          planPre[group] &&
          planPre[group][value.id] &&
          planPre[group][value.id].lo
            ? planPre[group][value.id].lo ?? "" // 위에서 null check가 원래는 되야 하는데 typescript 빈틈인듯
            : "";

        return (
          <PlanCard
            key={`${convertString(group)} - ${value.team1No} ${convertString(
              group
            )} - ${value.team2No}`}
            id={value.id}
            team1Group={`${convertString(group)} - ${value.team1No}`}
            team2Group={`${convertString(group)} - ${value.team2No}`}
            team1UID={value.team1}
            team2UID={value.team2}
            location={location}
            kickOffTime={time}
            handleOnLocation={setLocation}
            handleOnClose={setClose}
          />
        );
      })}
    </ExpansionPanel>
  );
};
