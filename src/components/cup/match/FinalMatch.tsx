import React, { useState, Dispatch, SetStateAction } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Collapse
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DroppableWrapper } from "./Droppable";
import { DraggableTeamList } from "./Draggable";
import {
  useAttendTeams,
  FinalDataStructure,
  useFinalTeams,
  useSetFinalTeams,
  useNumOfWild
} from "../../../context/cup/cupMatch";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "50px 0px 0px 0px",
      width: "80%"
    },
    detail: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    final: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",

      border: "1px solid black"
    },
    finalBtn: {
      margin: "15px",
      border: "1px solid black"
    },
    dragTarget: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "15px"
    }
  })
);

export interface FinalProps {}

export const FinalMatch: React.FC<FinalProps> = () => {
  const teamList = teamsWithWildCard(useAttendTeams(), useNumOfWild());
  const classes = useStyles();
  const setfinalData: Dispatch<SetStateAction<
    FinalDataStructure
  >> = useSetFinalTeams();
  const final = useFinalTeams();
  let round: number = final.round;
  const handleFinalTournament = (_: React.MouseEvent<unknown>, n: number) => {
    let newPTeams: FinalDataStructure = {
      order: Array<string>(n),
      round: n
    };

    setfinalData(newPTeams);
  };

  return (
    <div className={classes.root}>
      <CustomExPanel defaultExpanded={true}>
        <CustomExPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textPrimary" variant="h5">
            본선
          </Typography>
        </CustomExPanelSummary>

        <CustomExPanelDetails className={classes.detail}>
          <div className={classes.final} id="myPaint">
            <div>
              {[...Array(5).keys()].reverse().map(i => {
                const value: number = Math.pow(2, i + 2);
                return (
                  <Button
                    className={classes.finalBtn}
                    onClick={event => handleFinalTournament(event, value)}
                    key={i}
                  >
                    {value}강
                  </Button>
                );
              })}
            </div>
            <br />
            <div className={classes.dragTarget}>
              <DroppableWrapper numOfBoxes={round} teamList={teamList} />
            </div>
            <br />
            <DraggableTeamList teamList={teamList}></DraggableTeamList>
          </div>
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};

const teamsWithWildCard = (
  teamList: Array<string>,
  numOfWild: number
): Array<string> => {
  const teams: Array<string> = [...teamList];
  for (let i = 0; i < numOfWild; i++) teams.push(`WildCard${i}`);

  return teams;
};
