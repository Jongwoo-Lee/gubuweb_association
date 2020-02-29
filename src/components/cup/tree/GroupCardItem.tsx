import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { TeamListDlg } from "./TeamListDlg";
import { useTreePreTeams, useNewPreTeams } from "../../../hooks/cups";

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
}

export const GroupCardItem: React.FC<GroupCardItemProps> = ({
  group,
  iter
}: GroupCardItemProps) => {
  const [team, setTeam] = useState<string | null>(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const teams = useTreePreTeams(team);
  const setNewPreTeams = useNewPreTeams;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string | null) => {
    setOpen(false);
    console.log(`team-${team} value-${value}`);
    setNewPreTeams(team, value);
    setTeam(value);
  };

  return (
    <div className={classes.items}>
      <Typography
        className={classes.item}
        align="center"
        variant="body1"
        component="span"
      >
        {convertString(group)}조 {iter + 1}
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
