import React, { useState, Dispatch, SetStateAction } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  IconButton,
  Grid,
  Collapse
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { DroppableWrapper } from "./Droppable";
import { DraggableTeamList } from "./Draggable";
import {
  useAttendTeams,
  FinalDataStructure,
  useFinalTeams,
  useSetFinalTeams
} from "../../../context/cup/cupTree";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "80%",
      margin: "50px 0px 0px 0px"
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

export interface FinalProps {}

export const TreeFinal: React.FC<FinalProps> = () => {
  const teamList = useAttendTeams();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const setfinalData: Dispatch<SetStateAction<
    FinalDataStructure
  >> = useSetFinalTeams();
  const final = useFinalTeams();
  let round: number = final["round"];

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleTreeNum = (_: React.MouseEvent<unknown>, n: number) => {
    let newPTeams: FinalDataStructure = {
      order: Array<string>(n),
      round: n
    };

    setfinalData(newPTeams);
  };

  return (
    <div className={classes.root}>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.final} id="myPaint">
          <div>
            {[...Array(5).keys()].reverse().map(i => {
              const value: number = Math.pow(2, i + 2);
              return (
                <Button
                  className={classes.finalBtn}
                  onClick={event => handleTreeNum(event, value)}
                  key={i}
                >
                  {value}강
                </Button>
              );
            })}
          </div>
          <br />
          <div className={classes.dragTarget}>
            <DroppableWrapper numOfBoxes={round} teamList={teamList} />
          </div>
          <br />
          <DraggableTeamList teamList={teamList}></DraggableTeamList>
        </div>
      </Collapse>
    </div>
  );
};
