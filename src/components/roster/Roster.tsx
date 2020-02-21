import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { RouteComponentProps, Route } from "react-router-dom";
import { TitleGoBack } from "../common/TitleGoBack";
import { ROUTENAMES, ROUTES } from "../../constants/routes";
import { SquareRouteButton } from "../common/SquareButton";
import AddIcon from "@material-ui/icons/Add";
import { AddTeam } from "./AddTeam";
import { Team } from "../../helpers/Firebase/team";
import TeamIcon from "../../images/team_off.svg";
import { TeamProvider, useTeams } from "../../context/team/team";

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
  const teams: Team[] | null = useTeams();

  return (
    <div className={classes.root}>
      <TitleGoBack title={ROUTENAMES.ROSTER} />
      <div className={classes.cards}>
        <SquareRouteButton
          title={ROUTENAMES.ADD_TEAM}
          route={ROUTES.ADD_ROSTER}
          ImgIcon={AddIcon}
        />
        {teams && (teams.length > 0) &&
          teams.map((team: Team) =>
            <SquareRouteButton
              key={team.name}
              title={team.name}
              route={team.name}
              imgSrc={team.logo ?? TeamIcon}
            />
          )
        }
      </div>
    </div>
  );
};
