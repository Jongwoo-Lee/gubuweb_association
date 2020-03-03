import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useCallback } from "react";
import { TeamListDlg } from "./TeamListDlg";
import { useTeamsExceptPre } from "../../../hooks/cups";
import {
  usePreTeams,
  useSetPreTeams,
  PreDataStructure
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
  numOfTeams: number;
}

export const GroupCardItem: React.FC<GroupCardItemProps> = ({
  group,
  iter,
  numOfTeams
}: GroupCardItemProps) => {
  const classes = useStyles();
  const [team, setTeam] = useState<string | null>(null);
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
      if (!newPTeams[group]) newPTeams[group] = { t: numOfTeams }; // use previous data
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
        {convertString(group)} - {iter + 1}
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

export const convertString = (num: number): string => {
  let cStr: string = "";
  switch (num) {
    case 0:
      cStr = "A";
      break;
    case 1:
      cStr = "B";
      break;
    case 2:
      cStr = "C";
      break;
    case 3:
      cStr = "D";
      break;
    case 4:
      cStr = "E";
      break;
    case 5:
      cStr = "F";
      break;
    case 6:
      cStr = "G";
      break;
    case 7:
      cStr = "H";
      break;
    case 8:
      cStr = "I";
      break;
    case 9:
      cStr = "J";
      break;
    case 10:
      cStr = "K";
      break;
    case 11:
      cStr = "L";
      break;
    case 12:
      cStr = "M";
      break;
    case 13:
      cStr = "N";
      break;
  }

  return cStr;
};
