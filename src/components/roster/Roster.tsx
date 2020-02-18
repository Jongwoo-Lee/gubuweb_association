import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { RouteComponentProps, Route } from "react-router-dom";
import { TitleGoback } from "../common/TitleGoBack";
import { ROUTENAMES, ROUTES } from "../../constants/routes";
import { SquareButton } from "../common/SquareButton";
import AddIcon from "@material-ui/icons/Add";
import { AddTeam } from "./AddTeam";


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


export interface RosterProps { }


export const Roster = (props: RouteComponentProps) => {
  return (
    <div>
      <Route exact path={props.match.path} component={RosterComponent} />
      <Route path={ROUTES.ADD_ROSTER} component={AddTeam} />
    </div>
  );
};

export const RosterComponent: React.FC<RosterProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleGoback title={ROUTENAMES.ROSTER} />
      <div className={classes.cards}>
        <SquareButton
          title={ROUTENAMES.ADD_TEAM}
          route={ROUTES.ADD_ROSTER}
          ImgIcon={AddIcon}
        />
      </div>
    </div>
  );
};
