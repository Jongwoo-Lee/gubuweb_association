import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { CupInfo } from "../../helpers/Firebase/cup";
import { useCupsInfo, useCurCupID } from "../../context/cup/cup";
import { WrapCupDetailRecord } from "./record/WrapCupDetailRecord";

export interface CupDetailRecordProps {}

interface MatchRecordParams {
  gameID: string;
  id: string;
  group: string;
}

export const CupDetailRecord: React.FC<RouteComponentProps<
  MatchRecordParams
>> = (props: RouteComponentProps<MatchRecordParams>) => {
  const gameID: string = props.match.params.gameID;
  const id: string = props.match.params.id;
  const group: string = props.match.params.group;

  const cupID = useCurCupID();
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined =
    cupsInfo && cupID ? cupsInfo[cupID] : undefined;

  return cupInfo ? (
    <div>
      <Route exact path={props.match.path}>
        <WrapCupDetailRecord
          cupInfo={cupInfo}
          gameID={gameID}
          id={Number(id)}
          group={Number(group)}
        />
      </Route>
    </div>
  ) : (
    <div></div>
  );
};
