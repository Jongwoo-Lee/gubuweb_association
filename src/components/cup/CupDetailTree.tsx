import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography, Button } from "@material-ui/core";

import { TreePreliminary } from "./TreePreliminary";
import { CupInfo } from "../../helpers/Firebase/cup";
import { RouteComponentProps } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { TreeFinal } from "./TreeFinal";

export interface MatchParams {
  cupID: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    }
  })
);

export const CupDetailTree: React.SFC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  const classes = useStyles();
  const cupID: string = props.match.params.cupID;
  const cupsInfo = useCupsInfo();
  let cupInfo: CupInfo | undefined;

  if (cupsInfo !== undefined) cupInfo = cupsInfo[cupID];
  const teamList: string[] = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8"
  ];

  const handleOnSave = () => {};
  return (
    <div className={classes.root}>
      <TitleGoBack title={cupInfo?.name ?? "No data"} />
      <br />
      <br />
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography color="textPrimary" variant="h4">
          {ROUTENAMES.CUP_DETAIL_TEAM}
        </Typography>
        <Button variant="contained" onClick={handleOnSave}>
          저장
        </Button>
      </Grid>
      <br />
      <br />
      <TreePreliminary></TreePreliminary>

      <br />
      <br />
      <TreeFinal teamList={teamList}></TreeFinal>
    </div>
  );
};
