import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import { SquareButton } from "../common/SquareButton";
import TeamIcon from "../../images/team_off.svg";
import { TeamInviteDlg } from "./TeamInviteDlg";
import {
  usePushTeam,
  ContextSetTeams,
  useTeams
} from "../../context/team/team";
import { useSendBoolean } from "../../context/common/commonContext";

export interface SquarePopDlgButtonProps {
  team: Team;
}

export const SquarePopDlgButton: React.FC<SquarePopDlgButtonProps> = ({
  team
}: SquarePopDlgButtonProps) => {
  const { setTrue } = useSendBoolean();
  const [open, setOpen] = useState(false);
  const update: ContextSetTeams = usePushTeam();
  const preTeams: Team[] | null = useTeams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: boolean) => {
    setTrue(value);
    if (value === true) update([...preTeams, team]);
    setOpen(false);
  };

  return (
    <div>
      <SquareButton
        title={team.name}
        imgSrc={team.logo ?? TeamIcon}
        clickEvent={handleClickOpen}
      />
      <TeamInviteDlg
        title={"팀 정보"}
        team={team}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
