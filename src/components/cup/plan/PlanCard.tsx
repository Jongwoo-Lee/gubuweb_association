import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Grid,
  Button,
  Input,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { convertString, PreDataStructure } from "../../../context/cup/cupMatch";
import { PlanPreliminary } from "../../../context/cup/cup";
import { DatePickerDlg } from "./DatePickerDlg";

interface SubGameInfo {
  // [No: number]: string | null; // 4조(group) - 1 (No)
  team1: string | null;
  team1No: number;
  team2: string | null;
  team2No: number;
  location?: string;
  kickOffTime?: Date;
  id: number;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: "800px"
  },
  card: {
    display: "flex",
    flexDirection: "column"
  },
  cardTitle: {
    justifyContent: "center",
    margin: "10px"
  },
  paper: {
    textAlign: "center"
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "10px"
  },

  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface PlanCardProps {
  group: number;
  preliminaryData: PreDataStructure;
  round: number;
  planPre: PlanPreliminary;
  setPlanPre: React.Dispatch<React.SetStateAction<PlanPreliminary>>;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  // groups,
  group,
  preliminaryData,
  round,
  planPre,
  setPlanPre
}: PlanCardProps) => {
  const classes = useStyles();
  const numOfTeams: number = preliminaryData[group].t;
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(
    (date: Date | null) => {
      console.log(`open - ${date}`);
      setOpen(false);
    },
    [open]
  );
  const handlePopDlg = () => {
    setOpen(true);
  };

  const handleLocation = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    id: number
  ) => {
    event.preventDefault();

    const newPlan: PlanPreliminary = JSON.parse(JSON.stringify(planPre));
    if (!newPlan[group]) newPlan[group] = {};
    if (!newPlan[group][id]) newPlan[group][id] = { kt: null, lo: null };
    newPlan[group][id].lo = event.target.value;
    console.dir(newPlan);
    setPlanPre(newPlan);
  };

  const createCard = () => {
    const arr: Array<SubGameInfo> = [];
    let subGameId = 0;
    for (let i: number = 0; i < numOfTeams - 1; i++) {
      for (let j: number = i + 1; j < numOfTeams; j++) {
        const location: string =
          planPre[group] &&
          planPre[group][subGameId] &&
          planPre[group][subGameId].lo
            ? planPre[group][subGameId].lo ?? "" // 위에서 null check가 원래는 되야 하는데 typescript 빈틈인듯
            : "";

        arr.push({
          team1: preliminaryData[group][i] ?? null,
          team1No: i + 1,
          team2: preliminaryData[group][j] ?? null,
          team2No: j + 1,
          id: subGameId,
          location: location
        });
        subGameId++;
      }
    }
    return arr;
  };

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          // expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.summary}
        >
          <Typography align="center" color="textPrimary" variant="h6">
            {convertString(group)}조
          </Typography>
        </ExpansionPanelSummary>

        {createCard().map((value: SubGameInfo, index: number) => {
          const location: string =
            planPre[group] &&
            planPre[group][value.id] &&
            planPre[group][value.id].lo
              ? planPre[group][value.id].lo ?? "" // 위에서 null check가 원래는 되야 하는데 typescript 빈틈인듯
              : "";

          return (
            <ExpansionPanelDetails className={classes.detail}>
              <Card variant="outlined" key={index} className={classes.card}>
                <Grid container className={classes.cardTitle}>
                  <Typography align="center" variant="h6" component="span">
                    장소
                  </Typography>
                  <br />
                  <Grid container spacing={3}>
                    <Grid item xs className={classes.paper}>
                      <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                      >{`${convertString(group)} - ${
                        value.team1No
                      }`}</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.paper}>
                      <Input
                        name="location"
                        type="text"
                        id={`${group} - ${index}`}
                        value={location}
                        onChange={e => handleLocation(e, value.id)}
                        autoFocus
                        autoComplete="location"
                        aria-describedby="component-location"
                      />
                    </Grid>
                    <Grid item xs className={classes.paper}>
                      <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                      >{`${convertString(group)} - ${
                        value.team2No
                      }`}</Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={3}>
                    <Grid item xs className={classes.paper}>
                      <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                      >
                        {value.team1}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.paper}>
                      <Typography align="center" variant="h6" component="span">
                        킥오프
                      </Typography>
                    </Grid>
                    <Grid item xs className={classes.paper}>
                      <Typography
                        align="center"
                        variant="subtitle1"
                        component="span"
                      >
                        {value.team2}
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />

                  <Grid container className={classes.cardTitle}>
                    <Button variant="contained" onClick={handlePopDlg}>
                      {value.kickOffTime ?? "시간 설정"}
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </ExpansionPanelDetails>
          );
        })}
      </ExpansionPanel>
      <DatePickerDlg
        title={"예선 시간 선택"}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};
