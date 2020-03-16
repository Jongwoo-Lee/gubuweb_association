import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import {
  batchInviteTeam,
  batchDeleteInviteTeam
} from "../../helpers/Firebase/asc";
import { Dialog, DialogTitle, Button, Snackbar } from "@material-ui/core";
import { TeamInfo } from "../common/TeamInfo";
import { useAssociationValue } from "../../context/user";
import { FORMTEXT } from "../../constants/texts";
import { useSendBoolean } from "../../context/common";

export interface TeamInviteDlgProps {
  title: string;
  open: boolean;
  team: Team;
  onClose: Function;
  isDelete?: boolean;
  buttonText?: String;
}

export const TeamInviteDlg: React.FC<TeamInviteDlgProps> = ({
  title,
  open,
  team,
  onClose,
  isDelete,
  buttonText
}: TeamInviteDlgProps) => {
  const ascData = useAssociationValue();
  const [isLoading, setLoading] = useState(false);
  const [isFailure, setFailure] = useState(false);
  const { setTrue } = useSendBoolean();

  const handleClose = () => {
    onClose(false);
  };

  const handleInvite = async () => {
    setLoading(true);

    if (ascData !== null) {
      // const inviteFunction = isDelete ? batchDeleteInviteTeam : batchInviteTeam;
      // await inviteFunction(ascData.uid, team)
      //   .then(() => {
      //     if (!isDelete) {
      //       setLoading(false);
      //       onClose(true);
      //     }
      //   })
      //   .catch(err => {
      //     setLoading(false);
      //     setFailure(true);
      //     console.log(err);
      //   });
      isDelete
        ? // delete invite team 은 정상 동작시 Button 삭제되기 때문에 상단 component 에 boolean 보내야 됨
          await batchDeleteInviteTeam(ascData.uid, team)
            .then(() => setTrue(true))
            .catch(err => {
              setLoading(false);
              setFailure(true);
              console.log(err);
            })
        : await batchInviteTeam(ascData, team)
            .then(() => {
              setLoading(false);
              onClose(true);
            })
            .catch(err => {
              setLoading(false);
              setFailure(true);
              console.log(err);
            });
    }
    if (isLoading === true) setLoading(false);
  };

  const handleSnackBarClose = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setFailure(false);
    setLoading(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="teaminfo-dialog-title"
      open={open}
    >
      <DialogTitle id="teaminfo-dialog-title">{title}</DialogTitle>
      <TeamInfo team={team} />
      <Button onClick={handleInvite} disabled={isLoading}>
        {buttonText ?? isDelete
          ? team.isDeclined
            ? "팀 삭제"
            : "초대 취소"
          : "초대"}
      </Button>
      <Snackbar
        open={isFailure}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={
          isDelete
            ? team.isDeclined
              ? FORMTEXT.DELETE_TEAM
              : FORMTEXT.DELETE_INVITE_FAIL
            : FORMTEXT.INVITE_FAIL
        }
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      />
    </Dialog>
  );
};
