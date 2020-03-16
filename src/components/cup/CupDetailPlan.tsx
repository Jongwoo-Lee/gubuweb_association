import React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { CupInfo } from "../../models";
import { WrapCupDetailPlans } from "./plan/WrapCupDetailPlan";
import { CupDetailRecord } from "./CupDetailRecord";
import { CupPlanProvider } from "../../context/cup/cupPlan";

interface MatchParams {
  cupID: string;
}

export const CupDetailPlan: React.FC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined = cupsInfo ? cupsInfo[cupID] : undefined;
  const path: string = props.match.path + "/:gameUID";

  return cupInfo ? (
    <CupPlanProvider cupInfo={cupInfo}>
      <Route exact path={props.match.path}>
        <WrapCupDetailPlans cupID={cupID} cupInfo={cupInfo} />
      </Route>
      <Route path={path} component={CupDetailRecord} />
    </CupPlanProvider>
  ) : (
    <div></div>
  );
};

// export interface CupPlanProps {}
// const CupPlanComponent: React.SFC<CupPlanProps> = () => {
//   const cupsInfo = useCupsInfo();

//   const match = useRouteMatch<{ cupID: string }>();

//   return (cupInfo ? (
//     <WrapCupDetailPlans cupID={cupID} cupInfo={cupInfo} />
//   )
//   );
// };
