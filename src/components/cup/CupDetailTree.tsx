import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography, Button } from "@material-ui/core";

import { TreePreliminary } from "./tree/TreePreliminary";
import { CupInfo } from "../../helpers/Firebase/cup";
import { RouteComponentProps } from "react-router-dom";
import { useCupsInfo } from "../../context/cup/cup";
import { TreeFinal } from "./tree/TreeFinal";
import { ModCupTreeProvider } from "../../context/cup/cupTree";

export interface MatchParams {
  cupID: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    title: {
      width: "80%"
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

  const handleOnSave = () => { };
  return (
    <ModCupTreeProvider cupInfo={cupInfo}>
      <div className={classes.root}>
        <TitleGoBack title={cupInfo?.name ?? "No data"} />
        <br />
        <br />
        <Grid
          className={classes.title}
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
        <TreePreliminary></TreePreliminary>
        <TreeFinal></TreeFinal>
      </div>
    </ModCupTreeProvider>
  );
};
