import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupsInfo, useCurCupID } from "../../context/cup/cup";
import { WrapCupDetailRecord } from "./record/WrapCupDetailRecord";
import { SubGameInfo } from "../../context/game/game";

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

  return cupInfo ? (
    <div>
      <Route exact path={props.match.path}>
        <WrapCupDetailRecord cupInfo={cupInfo} gameInfo={data.gameInfo} />
      </Route>
    </div>
  ) : (
    <div></div>
  );
};
