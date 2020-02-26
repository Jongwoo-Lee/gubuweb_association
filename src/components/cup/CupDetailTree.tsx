import React, { useState } from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import {
  Grid,
  Typography,
  Button,
  Collapse,
  IconButton
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { AddGroupComponent } from "./AddGroupComponent";
import { DroppableWrapper } from "./droppable";
import { DroppableStack as DraggableTeamList } from "./draggable";

export interface CupDetailTreeProps {}

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
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },

    expandOpen: {
      transform: "rotate(180deg)"
    },

    line: {
      color: "black",
      backgroundColor: "black",
      borderColor: "black",
      height: 1,
      width: "100%"
    },
    final: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",

      border: "1px solid black"
    },

    finalBtn: {
      margin: "15px",
      border: "1px solid black"
    },

    dragTarget: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "15px"
    }
  })
);

export const CupDetailTree: React.SFC<CupDetailTreeProps> = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(true);
  const [num, setnum] = useState(4);
  const [arrangeTeam, setArrangeTeam] = useState(Array<string>(4));
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTreeNum = (event: React.MouseEvent<unknown>, n: number) => {
    setnum(n);
    setArrangeTeam(Array<string>(n));
  };
  console.log(`n - ${num}`);

  return (
    <div className={classes.root}>
      <TitleGoBack title="대회 이름" />
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
        <Button variant="contained" onClick={handleExpandClick}>
          저장
        </Button>
      </Grid>
      <br />
      <br />
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
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
      <hr className={classes.line} />

      {
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <AddGroupComponent></AddGroupComponent>
        </Collapse>
      }

      <br />
      <br />
      <Grid
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography color="textPrimary" variant="h5">
          본선
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
      <hr className={classes.line} />

      <div className={classes.final} id="myPaint">
        <div>
          {[...Array(5).keys()].reverse().map(i => {
            const num: number = Math.pow(2, i + 1);

            return (
              <Button
                className={classes.finalBtn}
                onClick={event => handleTreeNum(event, num)}
                key={i}
              >
                {num * 2}강
              </Button>
            );
          })}
        </div>
        <br />
        <div className={classes.dragTarget}>
          <DroppableWrapper
            numOfBoxes={num * 2}
            arrangeTeam={arrangeTeam}
            setArrageTeam={setArrangeTeam}
            teamList={teamList}
          />
        </div>
        <br />
        <DraggableTeamList
          arrangeTeam={arrangeTeam}
          teamList={teamList}
        ></DraggableTeamList>
      </div>
    </div>
  );
};
