import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
  CupMatchInfo,
  convertGroupString
} from "../../../context/cup/cupMatch";
import { PlanPreliminaryCards } from "./PlanPreliminaryCards";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";
import { PlanPreliminary } from "../../../context/cup/cupPlan";
import { GameInfoInput } from "./GameInfoInput";

interface UserClick {
  group: number;
  id: number;
}

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "50px 0px 0px 0px"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  btn: {
    margin: "0px 10px 0px 10px"
  }
});
export interface PreliminaryProps {
  matchInfo: CupMatchInfo;
  planPre: PlanPreliminary;
  setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
}

export const PreliminaryPlan: React.FC<PreliminaryProps> = (
  props: PreliminaryProps
) => {
  const classes = useStyles();
  let matchInfo: CupMatchInfo = props.matchInfo;

  const [expanded, setExpanded] = useState<UserClick>({ group: -1, id: -1 });

  const handleChange = (e: UserClick) => {
    if (expanded.group === -1 || expanded.id === -1) setExpanded(e);
    else {
      if (expanded.group === e.group && expanded.id === e.id) {
        setExpanded({ group: -1, id: -1 });
      } else {
        setExpanded({ group: e.group, id: e.id });
      }
    }
  };

  return (
    <div className={classes.root}>
      <CustomExPanel defaultExpanded={true}>
        <CustomExPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="textPrimary" variant="h5">
            예선
          </Typography>
        </CustomExPanelSummary>
        <CustomExPanelDetails className={classes.card}>
          {matchInfo && (
            <GameInfoInput
              setPlan={props.setPlanPre}
              plan={props.planPre}
              isFinal={false}
            />
          )}
          <div>
            {matchInfo &&
              Object.keys(matchInfo.p).map((value: string, index: number) => {
                let group: number = Number(value);

                // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
                return matchInfo !== undefined ? (
                  <Button
                    variant="contained"
                    color={expanded.id === index ? "primary" : undefined}
                    className={classes.btn}
                    onClick={e => handleChange({ group: group, id: index })}
                  >
                    {convertGroupString(group)}조
                  </Button>
                ) : (
                  <div></div>
                );
              })}
          </div>
          {expanded.group !== -1 && (
            <PlanPreliminaryCards
              group={expanded.group}
              preliminaryData={matchInfo.p}
              round={matchInfo.ro}
              key={expanded.id}
              setPlanPre={props.setPlanPre}
              planPre={props.planPre}
            />
          )}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};

// const useStyles = makeStyles({
//   root: {
//     width: "80%",
//     margin: "50px 0px 0px 0px"
//   },
//   card: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   }
// });
// export interface PreliminaryProps {
//   matchInfo: CupMatchInfo;
//   planPre: PlanPreliminary;
//   setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
// }

// export const PreliminaryPlan: React.FC<PreliminaryProps> = (
//   props: PreliminaryProps
// ) => {
//   const classes = useStyles();
//   let matchInfo: CupMatchInfo = props.matchInfo;

//   return (
//     <div className={classes.root}>
//       <CustomExPanel defaultExpanded={true}>
//         <CustomExPanelSummary
//           expandIcon={<ExpandMore />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography color="textPrimary" variant="h5">
//             예선
//           </Typography>
//         </CustomExPanelSummary>
//         <CustomExPanelDetails className={classes.card}>
//           {matchInfo && (
//             <GameInfoInput setPlan={props.setPlanPre} plan={props.planPre} />
//           )}
//           {matchInfo &&
//             Object.keys(matchInfo.p).map((value: string, index: number) => {
//               let group: number = Number(value);

//               // 위에서 걸러주는데 타입스크립트 IDE 버그인듯
//               return matchInfo !== undefined ? (
//                 <PlanPreliminaryCards
//                   group={group}
//                   preliminaryData={matchInfo.p}
//                   round={matchInfo.ro}
//                   key={index}
//                   setPlanPre={props.setPlanPre}
//                   planPre={props.planPre}
//                 />
//               ) : (
//                 <div></div>
//               );
//             })}
//         </CustomExPanelDetails>
//       </CustomExPanel>
//     </div>
//   );
// };
