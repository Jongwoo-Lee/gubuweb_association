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
import { convertString, PreDataStructure } from "../../../context/cup/cupMatch";

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
  label: string;
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
}

export const PreGroupTable: React.FC<PreGroupTableProps> = ({
  group,
  data
}: PreGroupTableProps) => {
  const classes = useStyles();
  console.dir(data);
  const numOfTeams: number = data[group].t;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) =>
              index > 1 ? (
                <TableCell align="right" key={column.id}>
                  {column.label}
                </TableCell>
              ) : (
                <TableCell key={column.id} className={classes.header}>
                  {index === 0
                    ? `${convertString(group)}조`
                    : `${column.label}`}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(numOfTeams).keys()].map((gr: number, index: number) => {
            return (
              <TableRow key={index}>
                {[...Array(8).keys()].map((test: number) => {
                  return (
                    <TableCell align={test > 1 ? "right" : undefined}>
                      {data[group][gr]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
