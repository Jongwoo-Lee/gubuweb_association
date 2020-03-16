import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Route } from "react-router-dom";
import { TitleGoBack } from "../common/TitleGoBack";
import { ROUTENAMES, ROUTES } from "../../constants/routes";
import { SquareRouteButton } from "../common/SquareButton";
import { TeamRouteButton } from "./TeamRouteButton";
import AddIcon from "@material-ui/icons/Add";
import { AddTeam } from "./AddTeam";

import { useAllTeams } from "../../context/team/team";
import { SendBooleanProvider } from "../../context/common";
import { FORMTEXT } from "../../constants/texts";
import { CommonSnackbar } from "../common/CommonSnackbar";
import { RosterTeam } from "./RosterTeam";
import { Team } from "../../models";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    cards: {
      display: "flex",
      marginTop: "40px",
      flexWrap: "wrap"
    }
  })
);

export interface RosterProps {}

export const Roster: React.FC<RosterProps> = () => {
  return (
    <div>
      <Route exact path={ROUTES.ROSTER} component={RosterComponent} />
      <Route path={ROUTES.ROSTER + ROUTES.ADD_ROSTER} component={AddTeam} />
      <Route
        path={ROUTES.ROSTER + ROUTES.ROSTER_TEAM + ROUTES.ROSTER_TEAM_ID}
        component={RosterTeam}
      />
    </div>
  );
};

export const RosterComponent: React.FC<RosterProps> = () => {
  const classes = useStyles();
  const teams = useAllTeams();

  return (
    <div className={classes.root}>
      <SendBooleanProvider>
        <TitleGoBack title={ROUTENAMES.ROSTER} />
        <div className={classes.cards}>
          <SquareRouteButton
            title={ROUTENAMES.ADD_TEAM}
            route={ROUTES.ROSTER + ROUTES.ADD_ROSTER}
            ImgIcon={AddIcon}
          />
          {teams &&
            teams.length > 0 &&
            teams.map((team: Team) => (
              <TeamRouteButton key={team.uid} team={team} />
            ))}
          <CommonSnackbar message={FORMTEXT.DELETE_INVITE_SUCCESS} />
        </div>
      </SendBooleanProvider>
    </div>
  );
};
