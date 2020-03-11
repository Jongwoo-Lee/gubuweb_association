import { makeStyles, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import React from "react";
import { useCurCupID, useCupsInfo } from "../../../context/cup/cup";
import { makeSubGame } from "../../../helpers/Firebase/cup";
import { useAssociationValue } from "../../../context/user";

interface MakeSubGameBtnProps {
  group?: number;
  round: number;
  subGameID?: string;
}

const useStyles = makeStyles({
  fixWidth2: {
    minWidth: "100px"
  }
});

export const MakeSubGameBtn: React.FC<MakeSubGameBtnProps> = ({
  group,
  round,
  subGameID
}: MakeSubGameBtnProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const cupID = useCurCupID();
  const ascData = useAssociationValue();

  const handleRecordClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    let gameUID: string | null | undefined = subGameID;
    if (typeof gameUID === "undefined")
      if (ascData && cupID) {
        gameUID = await makeSubGame(cupID, ascData.uid, round, group);
      }

    // game 생성 or 이미 있는 game 으로 이동
    if (gameUID) history.push(pathname + `/${gameUID}`);
  };

  return (
    <Button
      variant="contained"
      onClick={handleRecordClick}
      className={classes.fixWidth2}
    >
      기록
    </Button>
  );
};
