import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import { SquareButton } from "../common/SquareButton";
import TeamIcon from "../../images/team_off.svg";
import { TeamInviteDlg } from "./TeamInviteDlg";
import { Snackbar } from "@material-ui/core";
import { FORMTEXT } from "../../constants/texts";

export interface SquarePopDlgButtonProps {
  team: Team;
  isDelete?: boolean;
}

export const SquarePopDlgButton: React.FC<SquarePopDlgButtonProps> = ({
  team,
  isDelete
}: SquarePopDlgButtonProps) => {
  const [barOpen, setBarOpen] = useState(false);
  const [dlgOpen, setDlgOpen] = useState(false);
  // const update: ContextSetTeams = usePushTeam();
  // const preTeams: Team[] | null = useTeams();

  const handleClickOpen = () => {
    setDlgOpen(true);
  };

  const handleClose = (value: boolean) => {
    setBarOpen(value);
    setDlgOpen(false);
  };
  const handleSnackBarClose = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setBarOpen(false);
  };
  return (
    <div>
      <SquareButton
        title={team.name}
        imgSrc={team.logo ?? TeamIcon}
        clickEvent={handleClickOpen}
        isVerified={team.isVerified}
      />
      <TeamInviteDlg
        title={"팀 정보"}
        team={team}
        open={dlgOpen}
        onClose={handleClose}
        isDelete={isDelete}
      />
      <Snackbar
        open={barOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={
          isDelete ? FORMTEXT.DELETE_INVITE_SUCCESS : FORMTEXT.INVITE_SUCCESS
        }
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      />
    </div>
  );
};
