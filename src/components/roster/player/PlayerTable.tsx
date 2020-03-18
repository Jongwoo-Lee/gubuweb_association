import React from "react";
import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Hidden,
  Theme,
  createStyles
} from "@material-ui/core";
import { useCurrentTeam } from "../../../context/team/team";
import { Player } from "../../../models";
import { useHistory } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import PlayerIcon from "../../../images/user.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      width: "70vw",
      [theme.breakpoints.down("xs")]: {
        width: "90vw"
      }
    },
    player: {
      "&:hover": {
        backgroundColor: "#f2f9ff" //"#e6f7ff" // "#E2F5FD"
      }
    }
  })
);

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
            <Hidden smDown>
              <TableCell align="right">승인 날짜</TableCell>
            </Hidden>
            <Hidden smDown>
              <TableCell align="right">승인 만료일</TableCell>
            </Hidden>
          </TableRow>
        </TableHead>
        <TableBody>
          {team.players?.map(player => (
            <PlayerTableCell player={player} key={player.uid} />
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
  const classes = useStyles();
  const history = useHistory();
  const team = useCurrentTeam();

  const handlePlayerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const route = `${ROUTES.ROSTER}${ROUTES.ROSTER_TEAM}/${team?.uid}${ROUTES.ROSTER_TEAM_PLAYER}/${player.uid}`;

    history.push(route);
  };
  return (
    <TableRow className={classes.player} onClick={handlePlayerClick}>
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
      <TableCell align="right">{player.approve ? "승인" : "미정"}</TableCell>
      <Hidden smDown>
        <TableCell align="right">
          {player.approveDate && player.approveDate}
        </TableCell>
      </Hidden>
      <Hidden smDown>
        <TableCell align="right">
          {player.approveExpire && player.approveExpire}
        </TableCell>
      </Hidden>
    </TableRow>
  );
};
