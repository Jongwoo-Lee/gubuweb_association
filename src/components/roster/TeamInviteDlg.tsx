import React, { useState } from "react";
import { Team } from "../../helpers/Firebase/team";
import { batchInviteTeam } from "../../helpers/Firebase/asc";
import { Dialog, DialogTitle, Button, Snackbar } from "@material-ui/core";
import { TeamInfo } from "../common/TeamInfo";
import { useAssociationValue } from "../../context/user";

export interface TeamInviteDlgProps {
  title: string;
  open: boolean;
  team: Team;
  onClose: Function;
}

export const TeamInviteDlg: React.FC<TeamInviteDlgProps> = ({
  title,
  open,
  team,
  onClose
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
      await batchInviteTeam(ascData.uid, team.uid)
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
        초대
      </Button>
      <Snackbar
        open={isFailure}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="초대가 실패했습니다."
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      />
    </Dialog>
  );
};
