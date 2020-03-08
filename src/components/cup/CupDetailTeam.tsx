import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { WrapCupDetailTeam } from "./team/WrapCupDetailTeam";
import { CupInfo } from "../../helpers/Firebase/cup";

export interface MatchParams {
  cupID: string;
}

export const CupDetailTeam: React.SFC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined = cupsInfo ? cupsInfo[cupID] : undefined;
  return cupInfo ? (
    <WrapCupDetailTeam cupID={cupID} cupInfo={cupInfo} />
  ) : (
    <div></div>
  );
};
