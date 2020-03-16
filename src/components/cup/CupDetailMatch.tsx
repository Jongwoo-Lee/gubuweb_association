import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { WrapCupDetailMatch } from "./match/WrapCupDetailMatch";
import { CupInfo } from "../../models";

export interface MatchParams {
  cupID: string;
}

export const CupDetailMatch: React.SFC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined;
  if (cupsInfo !== undefined) cupInfo = cupsInfo[cupID];

  return cupInfo ? (
    <WrapCupDetailMatch cupInfo={cupInfo} cupID={cupID} />
  ) : (
    <div />
  );
};
