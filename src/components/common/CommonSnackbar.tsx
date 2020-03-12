import * as React from "react";
import { useSendBoolean } from "../../context/common";
import { Snackbar } from "@material-ui/core";

export interface CommonSnackbarkProps {
  message: string;
}

// Common Snackbar 사용시 SendBooleanProvider 필수
export const CommonSnackbar: React.FC<CommonSnackbarkProps> = ({ message }) => {
  const { isTrue, setTrue } = useSendBoolean();
  const handleSnackBarClose = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setTrue(false);
  };

  return (
    <Snackbar
      open={isTrue}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={message}
      autoHideDuration={5000}
      onClose={handleSnackBarClose}
    />
  );
};
