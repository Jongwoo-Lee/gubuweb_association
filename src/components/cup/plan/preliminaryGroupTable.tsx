import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Grid,
  Button,
  Input,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@material-ui/core";
import { DatePickerDlg, ExitWithID } from "./DatePickerDlg";
import {
  convertGroupString,
  PreDataStructure
} from "../../../context/cup/cupMatch";
import { GameCard, TableData } from "../../../context/game/game";

const useStyles = makeStyles({
  table: {
    width: "100%"
  },
  header: {
    minWidth: "60px"
  }
});

interface Column {
  id:
    | "group"
    | "point"
    | "win"
    | "draw"
    | "lose"
    | "diff"
    | "gainPoint"
    | "lossPoint";
  label: string | number;
}

const columns: Column[] = [
  { id: "group", label: "조" },
  { id: "point", label: "승점" },
  { id: "win", label: "승" },
  { id: "draw", label: "무" },
  { id: "lose", label: "패" },
  { id: "diff", label: "차" },
  { id: "gainPoint", label: "득" },
  { id: "lossPoint", label: "실" }
];

export interface PreGroupTableProps {
  group: number;
  data: PreDataStructure;
  gameCards: Array<GameCard>;
}

export const PreGroupTable: React.FC<PreGroupTableProps> = ({
  group,
  data,
  gameCards
}: PreGroupTableProps) => {
  const tableData: { [uid: string]: TableData } = makeTableData(
    group,
    data,
    gameCards
  );
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) =>
              index > 0 ? (
                <TableCell align="right" key={column.id}>
                  {column.label}
                </TableCell>
              ) : (
                <TableCell key={column.id} className={classes.header}>
                  {index === 0
                    ? `${convertGroupString(group)}조`
                    : `${column.label}`}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(tableData).map((value: string, index: number) => {
            return (
              <TableRow key={index}>
                {columns.map((column, index2) => {
                  return (
                    <TableCell
                      align={index2 > 0 ? "right" : undefined}
                      key={index2}
                    >
                      {tableData[value].value(column.id)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {/* {[...Array(numOfTeams).keys()].map((gr: number, index: number) => {
            return (
              <TableRow key={index}>
                {[...Array(columns.length).keys()].map(
                  (test: number, index2: number) => {
                    return (
                      <TableCell
                        align={test > 1 ? "right" : undefined}
                        key={index2}
                      >
                        {data[group][gr] + "asdfasdf"}
                      </TableCell>
                    );
                  }
                )}
              </TableRow>
            );
          })} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const makeTableData = (
  group: number,
  data: PreDataStructure,
  gameCards: Array<GameCard>
): { [uid: string]: TableData } => {
  const numOfTeams: number = data[group].t;
  const initialV: { [uid: string]: TableData } = {};
  [...Array(numOfTeams).keys()].map((value: number) => {
    if (data[group][value] !== null) {
      const uid: string = data[group][value] ?? "";
      initialV[uid] = new TableData(uid);
    }
  });

  gameCards.forEach((subGame: GameCard) => {
    if (
      subGame.winner !== undefined &&
      subGame.team1 !== null &&
      subGame.team2 !== null
    ) {
      if (subGame.winner === "") {
        initialV[subGame.team1].updateDraw();
        initialV[subGame.team2].updateDraw();
      } else {
        if (subGame.winner === subGame.team1) {
          initialV[subGame.team1].updateWin();
          initialV[subGame.team2].updateLose();
        } else {
          initialV[subGame.team1].updateLose();
          initialV[subGame.team2].updateWin();
        }
      }

      if (typeof subGame?.score !== "undefined")
        TableData.updateScore(
          initialV[subGame.team1],
          initialV[subGame.team2],
          subGame.score
        );
    }
  });

  return initialV;
};
