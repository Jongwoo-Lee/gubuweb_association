import React from "react";
import { makeStyles, createStyles, Theme, Snackbar } from "@material-ui/core";
import { RouteComponentProps, Route } from "react-router-dom";
import { TitleGoBack } from "../common/TitleGoBack";
import { ROUTENAMES, ROUTES } from "../../constants/routes";
import { SquareRouteButton } from "../common/SquareButton";
import { TeamRouteButton } from "./TeamRouteButton";
import AddIcon from "@material-ui/icons/Add";
import { AddTeam } from "./AddTeam";
import { Team } from "../../helpers/Firebase/team";

import { TeamProvider, useAllTeams } from "../../context/team/team";
import { SendBooleanProvider } from "../../context/common";
import { FORMTEXT } from "../../constants/texts";
import { CommonSnackbar } from "../common/CommonSnackbar";

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

export const Roster = (props: RouteComponentProps) => {
  return (
    <div>
      <TeamProvider>
        <Route exact path={props.match.path} component={RosterComponent} />
        <Route path={ROUTES.ADD_ROSTER} component={AddTeam} />
      </TeamProvider>
    </div>
  );
};

export const RosterComponent: React.FC<RosterProps> = () => {
  const classes = useStyles();

  // fire
  const teams: Team[] | null = useAllTeams();

  return (
    <div className={classes.root}>
      <SendBooleanProvider>
        <TitleGoBack title={ROUTENAMES.ROSTER} />
        <div className={classes.cards}>
          <SquareRouteButton
            title={ROUTENAMES.ADD_TEAM}
            route={ROUTES.ADD_ROSTER}
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
