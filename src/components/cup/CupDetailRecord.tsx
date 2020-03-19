import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { CupInfo } from "../../models";
import { useCupsInfo, useCurCupID } from "../../context/cup/cup";
import { WrapCupDetailRecord } from "./record/WrapCupDetailRecord";
import { GameCard } from "../../context/game/game";
import { CupRecordProvider } from "../../context/cup/cupRecord";

interface MatchRecordParams {}

export const CupDetailRecord: React.FC<RouteComponentProps<
  MatchRecordParams
>> = (props: RouteComponentProps<MatchRecordParams>) => {
  const data: { gameInfo: GameCard } = props.location.state as {
    gameInfo: GameCard;
  };
  const cupID = useCurCupID();
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined =
    cupsInfo && cupID ? cupsInfo[cupID] : undefined;

  // Typescript error, cupInfo가 있으려면 cupID가 필요한데 걸러주지를 못한다
  // return cupInfo ? (
  return cupInfo && cupID && data.gameInfo.gid ? (
    <CupRecordProvider cupID={cupID} gameCard={data.gameInfo}>
      <WrapCupDetailRecord cupInfo={cupInfo} gameCard={data.gameInfo} />
    </CupRecordProvider>
  ) : (
    <div></div>
  );
};
