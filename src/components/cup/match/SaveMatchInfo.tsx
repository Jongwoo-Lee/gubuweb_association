import React from "react";
import { Button } from "@material-ui/core";
import { useFinalTeams, usePreTeams } from "../../../context/cup/cupMatch";
import { saveCupMatch } from "../../../helpers/Firebase/cup";

interface SaveBtnProps {
  cupID: string;
}

export const SaveMatchBtn: React.FC<SaveBtnProps> = ({
  cupID
}: SaveBtnProps) => {
  const fData = useFinalTeams();
  const pData = usePreTeams();

  const handleOnSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    saveCupMatch(cupID, pData, fData);
  };
  return (
    <Button
      variant="contained"
      onClick={e => {
        handleOnSave(e);
      }}
    >
      저장
    </Button>
  );
};
