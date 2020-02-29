import React from "react";
import { Dialog, DialogTitle, Button, Snackbar } from "@material-ui/core";
import { Team } from "../../../helpers/Firebase/team";

export interface TeamListDlgProps {
  title: string;
  open: boolean;
  onClose: Function;
}

export const TeamListDlg: React.FC<TeamListDlgProps> = ({
  title,
  open,
  onClose
}: TeamListDlgProps) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="teaminfo-dialog-title"
      open={open}
    >
      <DialogTitle id="teaminfo-dialog-title">{title}</DialogTitle>
      {/* <TeamInfo team={team} /> */}
      {/* <Button >?onClick={handleInvite} disabled={isLoading}> */}
      <Button>초대</Button>
    </Dialog>
  );
};
