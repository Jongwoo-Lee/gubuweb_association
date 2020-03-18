import {
  Card,
  makeStyles,
  CardContent,
  Table,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import React from "react";
import TeamIcon from "../../images/team_off.svg";
import { Team, getTeamInfo } from "../../models";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    minWidth: 400,
    margin: "20px 20px",
    overflow: "auto"
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  table: {
    minWidth: 300
  }
});

export interface TeamInfoProps {
  team: Team;
}

export const TeamInfo: React.FC<TeamInfoProps> = ({ team }: TeamInfoProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.logo}>
        <img
          alt="teamlogo"
          src={team.logo ?? TeamIcon}
          style={{ width: "100px", height: "100px" }}
        />
      </CardContent>
      <CardContent>
        <Table className={classes.table}>
          <TableBody>
            {teamTableCells(team)}
            {/* {tableComponent.length > 0 &&
              tableComponent.map((e: JSX.Element) => e)} */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Object entries Map
const teamTableCells = (team: Team) => {
  return Object.entries(getTeamInfo(team)).map(([key, value]) => {
    return (
      <TableRow key={key}>
        <TableCell>{key}</TableCell>
        <TableCell align="center">{value}</TableCell>
      </TableRow>
    );
  });
};

// const teamInfo: Map<string, string> = getTeamInfo(team);
// const tableComponent: JSX.Element[] = new Array<JSX.Element>();

// teamInfo.forEach((value: string, key: string, _: Map<string, string>) => {
//   tableComponent.push(
//     <TableRow key={key}>
//       <TableCell>{key}</TableCell>
//       <TableCell align="center">{value}</TableCell>
//     </TableRow>
//   );
