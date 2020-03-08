import React from "react";
import { Typography } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { MatchParams } from "./CupDetailTeam";
import { useCupsInfo } from "../../context/cup/cup";
import { CupInfo } from "../../helpers/Firebase/cup";
import { WrapCupDetailPlans } from "./plan/WrapCupDetailPlan";

export interface CupDetailPlanProps { }

export const CupDetailPlan: React.FC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined = cupsInfo ? cupsInfo[cupID] : undefined;
  return cupInfo ? (
    <WrapCupDetailPlans cupID={cupID} cupInfo={cupInfo} />
  ) : (
      <div></div>
    );
};
