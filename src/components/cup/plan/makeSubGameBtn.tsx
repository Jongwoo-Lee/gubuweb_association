import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import React from "react";
import { useCurCupID } from "../../../context/cup/cup";
import { makeSubGame } from "../../../helpers/Firebase/game";
import { useAssociationValue } from "../../../context/user";
import { GameCard } from "../../../context/game/game";

interface MakeSubGameBtnProps {
  gameCard: GameCard;
  setGameUID: Function;
}

export const MakeSubGameBtn: React.FC<MakeSubGameBtnProps> = ({
  gameCard,
  setGameUID
}: MakeSubGameBtnProps) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const cupID = useCurCupID();
  const ascData = useAssociationValue();

  const group: number | undefined = gameCard.group;
  const id: number = gameCard.id;
  const subGameID: string | undefined = gameCard.gid;

  const handleRecordClick = async (e: React.MouseEvent) => {
    let newCard: GameCard = GameCard.fromGameCard(gameCard);
    e.preventDefault();
    let gameUID: string | null | undefined = subGameID;
    if (typeof gameUID === "undefined")
      if (ascData && cupID) {
        gameUID = await makeSubGame(cupID, ascData.uid, id, gameCard, group);
        setGameUID(gameUID, id);
        newCard.gid = gameUID;
      }

    // game 생성 or 이미 있는 game 으로 이동
    if (gameUID)
      history.push(pathname + `/${gameUID}`, {
        gameInfo: newCard
      });
  };

  return (
    <Button variant="contained" onClick={handleRecordClick} fullWidth>
      기록
    </Button>
  );
};
