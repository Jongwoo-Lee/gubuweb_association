import React, { useState } from "react";
import { SquareButton } from "../common/SquareButton";
import TeamIcon from "../../images/team_off.svg";
import { TeamInviteDlg } from "./TeamInviteDlg";
import { useSendBoolean } from "../../context/common";
import { Team } from "../../models";

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
        buttonState={
          team.isVerified
            ? "승인"
            : team.isDeclined === true
            ? "거절"
            : team.invitedAt !== undefined
            ? "승인 대기"
            : ""
        }
      />
      <TeamInviteDlg
        title={"팀 정보"}
        team={team}
        open={dlgOpen}
        onClose={handleClose}
        isDelete={isDelete}
        buttonText={team.isDeclined ? "팀 삭제" : undefined}
      />
    </div>
  );
};
