import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupsInfo, useCurCupID } from "../../context/cup/cup";
import { WrapCupDetailRecord } from "./record/WrapCupDetailRecord";
import { SubGameInfo } from "../../context/game/game";
import { CupRecordProvider } from "../../context/cup/cupRecord";

interface MatchRecordParams {}

export const CupDetailRecord: React.FC<RouteComponentProps<
  MatchRecordParams
>> = (props: RouteComponentProps<MatchRecordParams>) => {
  const data: { gameInfo: SubGameInfo } = props.location.state as {
    gameInfo: SubGameInfo;
  };
  const cupID = useCurCupID();
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined =
    cupsInfo && cupID ? cupsInfo[cupID] : undefined;

  // Typescript error, cupInfo가 있으려면 cupID가 필요한데 걸러주지를 못한다
  // return cupInfo ? (
  return cupInfo && cupID && data.gameInfo.gid ? (
    <CupRecordProvider cupID={cupID} gameID={data.gameInfo.gid}>
      <WrapCupDetailRecord cupInfo={cupInfo} gameInfo={data.gameInfo} />
    </CupRecordProvider>
  ) : (
    <div></div>
  );
};
