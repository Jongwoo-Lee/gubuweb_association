import React from "react";
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { useCurrentTeam } from "../../context/team/team";
import { Player } from "../../models";
import PlayerIcon from "../../images/user.svg";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    width: "70vw"
  }
});

export const PlayerTable = () => {
  const classes = useStyles();
  const team = useCurrentTeam();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table aria-label="roster player table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#f5f5f5" }}>
            <TableCell align="center">이름</TableCell>
            <TableCell align="right">상태</TableCell>
            <TableCell align="right">승인 날짜</TableCell>
            <TableCell align="right">승인 만료일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team?.players?.map(player => (
            <PlayerTableCell player={player} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export interface PlayerTableCellProps {
  player: Player;
}

export const PlayerTableCell: React.FC<PlayerTableCellProps> = ({ player }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            alt="playerprofile"
            src={
              player.image !== undefined && player.image !== "-"
                ? player.image
                : PlayerIcon
            }
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          {player.name}
        </div>
      </TableCell>
      <TableCell align="right">{player.backnumber}</TableCell>
      <TableCell align="right">2020.01.21</TableCell>
      <TableCell align="right">2020.06.21</TableCell>
    </TableRow>
  );
};
