import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import { batchInviteTeam } from "../../helpers/Firebase/asc";
import { Dialog, DialogTitle, Button, Snackbar } from "@material-ui/core";
import { TeamInfo } from "../common/TeamInfo";
import { useAssociationValue } from "../../context/user";
import { FORMTEXT } from "../../constants/texts";

export interface TeamInviteDlgProps {
  title: string;
  open: boolean;
  team: Team;
  onClose: Function;
  isDelete?: boolean;
}

export const TeamInviteDlg: React.FC<TeamInviteDlgProps> = ({
  title,
  open,
  team,
  onClose,
  isDelete
}: TeamInviteDlgProps) => {
  const ascData = useAssociationValue();
  const [isLoading, setLoading] = useState(false);
  const [isFailure, setFailure] = useState();

  const handleClose = () => {
    onClose(false);
  };

  const handleInvite = async () => {
    setLoading(true);

    if (ascData !== null) {
      isDelete
        ? onClose(true)
        : await batchInviteTeam(ascData.uid, team)
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
        {isDelete ? "초대 취소" : "초대"}
      </Button>
      <Snackbar
        open={isFailure}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={isDelete ? FORMTEXT.DELETE_INVITE_FAIL : FORMTEXT.INVITE_FAIL}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      />
    </Dialog>
  );
};
