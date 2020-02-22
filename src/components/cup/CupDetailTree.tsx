import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Grid, Typography, Button, Collapse, IconButton } from "@material-ui/core";
import { ExpandMore, ExpandMoreRounded, ExpandMoreSharp, ExpandMoreTwoTone } from "@material-ui/icons";
import { AddGroupCard } from "./addGroupCard";

export interface CupDetailTreeProps { }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column"
    },
    cards: {
      display: "flex",
      marginTop: "40px",
      flexWrap: "wrap"
    },

    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },

    expandOpen: {
      transform: 'rotate(180deg)',
    },

    line: {
      color: 'black',
      backgroundColor: 'black',
      borderColor: 'black',
      height: 1,
      width: "100%"
    }
  })
);

export const CupDetailTree: React.SFC<CupDetailTreeProps> = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={classes.root}>
      <TitleGoBack title='대회 이름' />
      <br />
      <br />
      <Grid container spacing={3}
        justify="space-between"
        alignItems="flex-start">
        <Typography color="textPrimary" variant="h4">
          {ROUTENAMES.CUP_DETAIL_TEAM}
        </Typography>
        <Button variant="contained" onClick={handleExpandClick}>
          저장
        </Button>
      </Grid>
      <br />
      <br />
      <Grid container spacing={3}
        justify="space-between"
        alignItems="flex-start">
        <Typography color="textPrimary" variant="h5">
          예선
        </Typography>
        <IconButton
          className={expanded ? classes.expandOpen : classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </Grid>
      <br />
      <hr
        className={classes.line} />

      {<Collapse in={expanded} timeout="auto" unmountOnExit>
        <AddGroupCard></AddGroupCard>
      </Collapse>}
    </div>
  );
};
