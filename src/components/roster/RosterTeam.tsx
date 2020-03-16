import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useAscTeams } from "../../context/team/team";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { TitleGoBack } from "../common/TitleGoBack";
import { ROUTENAMES } from "../../constants/routes";
import { TeamName } from "./TeamName";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    team: {
      marginTop: "20px",
      marginLeft: "20px"
    }
  })
);

export interface RosterTeamProps {}

export const RosterTeam: React.FC<RosterTeamProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch<{ teamId: string }>();
  const teams = useAscTeams();
  const team = teams.find(team => team.uid === match.params.teamId);

  useEffect(() => {
    if (team === undefined) history.goBack();
    return () => {};
  }, []);

  return team === undefined ? (
    <TitleGoBack title={ROUTENAMES.ROSTER} />
  ) : (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.ROSTER} />
      <br />
      <div className={classes.team}>
        <TeamName team={team} />
        {team.players &&
          team.players.map(pl => {
            return <p key={pl.uid}>{pl.name}</p>;
          })}
      </div>
    </div>
  );
};
