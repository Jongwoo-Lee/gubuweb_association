import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useCallback } from "react";
import { TeamListDlg } from "./TeamListDlg";
import { useTeamsExceptPre } from "../../../hooks/cups";
import {
  usePreTeams,
  useSetPreTeams,
  PreDataStructure,
  convertGroupString
} from "../../../context/cup/cupMatch";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 520,
    margin: "10px 10px"
  },
  cardTitle: {
    margin: "0px 10px"
  },
  items: {
    display: "flex",
    flexDirection: "row",
    width: 400,
    alignItems: "center",
    justifyContent: "space-between"
  },
  item: {
    margin: "5px 20px"
  }
});

export interface GroupCardItemProps {
  group: number;
  iter: number;
  teamUID: string | null;
  numOfTeams: number;
  numOfAdvFinal: number;
}

export const GroupCardItem: React.FC<GroupCardItemProps> = ({
  group,
  iter,
  teamUID,
  numOfTeams,
  numOfAdvFinal
}: GroupCardItemProps) => {
  const classes = useStyles();
  const [team, setTeam] = useState<string | null>(teamUID);
  const [open, setOpen] = useState(false);
  const pTeams: PreDataStructure = usePreTeams();
  const teams = useTeamsExceptPre(team, pTeams, group, iter);
  const setPTeams = useSetPreTeams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(
    (value: string | null) => {
      let newPTeams: PreDataStructure = JSON.parse(JSON.stringify(pTeams));
      if (!newPTeams[group])
        newPTeams[group] = { t: numOfTeams, ft: numOfAdvFinal }; // use previous data
      newPTeams[group][iter] = value;
      setPTeams(newPTeams);
      setOpen(false);
      setTeam(value);
    },
    [open]
  );

  return (
    <div className={classes.items}>
      <Typography
        className={classes.item}
        align="center"
        variant="body1"
        component="span"
      >
        {convertGroupString(group)} - {iter + 1}
      </Typography>
      <IconButton onClick={handleClickOpen}>
        <Typography
          className={classes.item}
          align="center"
          variant="body1"
          component="span"
        >
          {team ?? "+ 팀 추가"}
        </Typography>
      </IconButton>
      <TeamListDlg
        title={"팀 리스트"}
        open={open}
        onClose={handleClose}
        teams={teams}
        team={team}
      ></TeamListDlg>
    </div>
  );
};
