import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import { SquareButton } from "../common/SquareButton";
import TeamIcon from "../../images/team_off.svg";
import { TeamInviteDlg } from "./TeamInviteDlg";
import { useSendBoolean } from "../../context/common";

export interface SquarePopDlgButtonProps {
  team: Team;
  isDelete?: boolean;
}

export const SquarePopDlgButton: React.FC<SquarePopDlgButtonProps> = ({
  team,
  isDelete
}: SquarePopDlgButtonProps) => {
  const { setTrue } = useSendBoolean();
  const [dlgOpen, setDlgOpen] = useState(false);

  const handleClickOpen = () => {
    setDlgOpen(true);
  };

  const handleClose = (value: boolean) => {
    setTrue(value);
    setDlgOpen(false);
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
    </div>
  );
};
