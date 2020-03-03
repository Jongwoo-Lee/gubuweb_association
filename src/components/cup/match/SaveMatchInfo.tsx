import React from "react";
import { Button } from "@material-ui/core";
import {
  useFinalTeams,
  usePreTeams,
  useRound,
  useNumOfWild
} from "../../../context/cup/cupMatch";
import { saveCupMatch } from "../../../helpers/Firebase/cup";

interface SaveBtnProps {
  cupID: string;
}

export const SaveMatchBtn: React.FC<SaveBtnProps> = ({
  cupID
}: SaveBtnProps) => {
  const fData = useFinalTeams();
  const pData = usePreTeams();
  const round: number = useRound();
  const numOfRound: number = useNumOfWild();

  const handleOnSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    saveCupMatch(cupID, pData, fData, round, numOfRound);
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
