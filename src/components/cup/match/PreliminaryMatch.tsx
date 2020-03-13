import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, IconButton, Grid } from "@material-ui/core";
import { GroupCard } from "./GroupCard";
import { ExpandMore } from "@material-ui/icons";
import { NumbericUpDownCtrl } from "./NumbericUpDownCtrl";
import {
  PreDataStructure,
  useSetPreTeams,
  useRound,
  useSetRound,
  useNumOfWild,
  useSetNumOfWild,
  usePreTeams
} from "../../../context/cup/cupMatch";
import {
  CustomExPanel,
  CustomExPanelSummary,
  CustomExPanelDetails
} from "../CustomExPanel";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "50px 0px 0px 0px"
  },

  detail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
    padding: "10px"
  },
  setting: {
    display: "flex",
    flexDirection: "row"
  },
  title: {
    margin: "10px 10px" // top right bottom left
  },
  contents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 10px"
  }
});
export interface PreliminaryProps {}

interface GroupCardNumOfTeams {
  id: number;
  numOfTeams: number;
  numOfAdvFinal: number; // Advanced to the final,
  teams: Array<string | null>;
}

export const PreliminaryMatch: React.FC<PreliminaryProps> = () => {
  const classes = useStyles();
  const [numOfTeams, setNumOfTeams] = useState(3);
  const [numOfAdvFinal, setNumOfAdvFinal] = useState(1);
  const [cardObjList, setcardIdList] = useState<Array<GroupCardNumOfTeams>>(
    initializeGroupCard(usePreTeams())
  );
  const setPTeams = useSetPreTeams();

  const handleDelete = (id: number) => {
    const newIdList: Array<GroupCardNumOfTeams> = Object.assign(
      [],
      cardObjList
    );
    const idx: number = newIdList.findIndex(find => find.id === id);
    if (idx !== -1) {
      newIdList.splice(idx, 1);
    }

    setcardIdList(newIdList);
  };

  const clearCard = () => {
    setcardIdList([]);

    // initialize
    setPTeams({});
  };

  const handleMakeCard = () => {
    const newID: number =
      cardObjList.length === 0
        ? 0
        : Math.max.apply(
            Math,
            cardObjList.map(i => i.id)
          ) + 1;
    setcardIdList([
      ...cardObjList,
      {
        id: newID,
        numOfTeams: numOfTeams,
        numOfAdvFinal: numOfAdvFinal,
        teams: Array<string | null>(numOfTeams).fill(null)
      }
    ]);
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
        <CustomExPanelDetails className={classes.detail}>
          <div className={classes.setting}>
            <Grid container spacing={3} justify="center">
              <Card className={classes.card} variant="outlined">
                <Typography
                  className={classes.title}
                  variant="body1"
                  component="span"
                >
                  조 추가
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={3}
                >
                  <Grid item xs>
                    <Typography className={classes.contents} variant="body2">
                      팀 수
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.contents} variant="body2">
                      <NumbericUpDownCtrl
                        numOfItem={numOfTeams}
                        disPatchItem={setNumOfTeams}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={3}
                >
                  <Grid item xs>
                    <Typography className={classes.contents} variant="body2">
                      본선 진출 수
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography className={classes.contents} variant="body2">
                      <NumbericUpDownCtrl
                        numOfItem={numOfAdvFinal}
                        disPatchItem={setNumOfAdvFinal}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Button onClick={handleMakeCard}>확인</Button>
              </Card>
            </Grid>
            <Grid container spacing={3} justify="center">
              <div className={classes.card}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="body1"
                  component="span"
                >
                  예선 설정
                </Typography>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={3}
                >
                  <Grid item xs>
                    <Typography
                      className={classes.contents}
                      variant="body2"
                      component="span"
                    >
                      라운드 수
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      className={classes.contents}
                      variant="body2"
                      component="span"
                    >
                      <NumbericUpDownCtrl
                        numOfItem={useRound()}
                        disPatchItem={useSetRound()}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={3}
                >
                  <Grid item xs>
                    <Typography
                      className={classes.contents}
                      variant="body2"
                      component="span"
                    >
                      와일드 카드
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      className={classes.contents}
                      variant="body2"
                      component="span"
                    >
                      <NumbericUpDownCtrl
                        numOfItem={useNumOfWild()}
                        disPatchItem={useSetNumOfWild()}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </div>
          {cardObjList.length > 0 &&
            cardObjList.map((o: GroupCardNumOfTeams, index: number) => {
              return (
                <GroupCard
                  id={o.id}
                  key={o.id}
                  numOfTeams={o.numOfTeams}
                  numOfAdvFinal={o.numOfAdvFinal}
                  group={index}
                  onDelete={handleDelete}
                  teams={o.teams}
                />
              );
            })}
          {cardObjList.length > 0 && (
            <Grid container item xs={12} justify="flex-end">
              <IconButton onClick={clearCard}>
                <Typography variant="body1" component="span">
                  예선 삭제
                </Typography>
              </IconButton>
            </Grid>
          )}
        </CustomExPanelDetails>
      </CustomExPanel>
    </div>
  );
};

const initializeGroupCard = (
  preData: PreDataStructure
): Array<GroupCardNumOfTeams> => {
  const arr: Array<GroupCardNumOfTeams> = [];

  Object.keys(preData).forEach((value: string, index: number) => {
    let group: number = Number(value);
    const numOfTeams: number = preData[group].t;
    const teams: Array<string | null> = Array<string | null>(
      preData[group].t
    ).fill(null);

    for (let i = 0; i < numOfTeams; i++) {
      if (preData[group][i]) teams[i] = preData[group][i];
    }
    arr.push({
      id: index,
      numOfTeams: numOfTeams,
      numOfAdvFinal: preData[group].ft,
      teams: teams
    });
  });

  return arr;
};
