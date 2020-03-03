import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Grid,
  Collapse
} from "@material-ui/core";
import { GroupCard } from "./GroupCard";
import { ExpandMore } from "@material-ui/icons";
import { NumbericUpDownCtrl } from "./NumbericUpDownCtrl";
import { usePreTeams, PreDataStructure } from "../../../context/cup/cupMatch";

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
    setting: {
      display: "flex",
      flexDirection: "row"
    },
    settingItems: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 250,
      height: 220,
      minWidth: 150,
      margin: "10px 10px"
    },
    subItems: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: 200,
      minWidth: 150,
      margin: "5px 5px"
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
  })
);
export interface PreliminaryProps {}

export const PreliminaryMatch: React.FC<PreliminaryProps> = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [numOfTeams, setNumOfTeams] = useState(3);
  const [numOfAdvFinal, setNumOfAdvFinal] = useState(1); // Advanced to the final
  const [numOfRound, setNumOfRound] = useState(1);
  const [numOfWildCard, setNumOfWildCard] = useState(1);
  const [cardIdList, setcardIdList] = useState<Array<number>>([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelete = (id: number) => {
    const newCards: Array<number> = [...cardIdList];
    const idx: number = newCards.findIndex(find => find === id);
    if (idx !== -1) {
      newCards.splice(idx, 1);
    }

    setcardIdList(newCards);
  };

  const clearCard = () => {
    setcardIdList([]);
  };
  const handleMakeCard = () => {
    const newID: number =
      cardIdList.length === 0 ? 0 : Math.max(...cardIdList) + 1;
    setcardIdList([...cardIdList, newID]);
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

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className={classes.setting}>
          <Card className={classes.settingItems} variant="outlined">
            <Typography
              className={classes.title}
              variant="body1"
              component="span"
            >
              조 추가
            </Typography>
            <div className={classes.subItems}>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                팀 수
              </Typography>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                <NumbericUpDownCtrl
                  numOfItem={numOfTeams}
                  disPatchItem={setNumOfTeams}
                />
              </Typography>
            </div>
            <div className={classes.subItems}>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                본선 진출 수
              </Typography>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                <NumbericUpDownCtrl
                  numOfItem={numOfAdvFinal}
                  disPatchItem={setNumOfAdvFinal}
                />
              </Typography>
            </div>
            <Button onClick={handleMakeCard}>확인</Button>
          </Card>
          <div className={classes.settingItems}>
            <Typography
              className={classes.title}
              align="center"
              variant="body1"
              component="span"
            >
              예선 설정
            </Typography>
            <div className={classes.subItems}>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                라운드 수
              </Typography>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                <NumbericUpDownCtrl
                  numOfItem={numOfRound}
                  disPatchItem={setNumOfRound}
                />
              </Typography>
            </div>
            <div className={classes.subItems}>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                와일드 카드
              </Typography>
              <Typography
                className={classes.contents}
                variant="body2"
                component="span"
              >
                <NumbericUpDownCtrl
                  numOfItem={numOfWildCard}
                  disPatchItem={setNumOfWildCard}
                />
              </Typography>
            </div>
          </div>
        </div>
        {cardIdList.length > 0 &&
          cardIdList.map((id: number, index: number) => {
            return (
              <GroupCard
                id={id}
                key={id}
                numOfTeams={numOfTeams}
                group={index}
                onDelete={handleDelete}
              />
            );
          })}
        {cardIdList.length > 0 && (
          <Grid container item xs={12} justify="flex-end">
            <IconButton onClick={clearCard}>
              <Typography variant="body1" component="span">
                예선 삭제
              </Typography>
            </IconButton>
          </Grid>
        )}
      </Collapse>
    </div>
  );
};

const initializeGroupCard = (preData: PreDataStructure): Array<JSX.Element> => {
  const newArr: Array<JSX.Element> = new Array<JSX.Element>();
  let numOfGroups: number = -1;
  Object.keys(preData).forEach((value: string) => {
    let temp: number = Number(value);
    if (numOfGroups < temp) numOfGroups = temp;
  });

  //Card마다 팀 수가 다를 수 있는지 확인해봐야 함
  for (let i = 0; i < numOfGroups; i++) {
    // if(preData[i] !== null)
    // {
    //   newArr.push(
    //   // <GroupCard
    //   //   key={0}
    //   //   numOfTeams={numOfTeams}
    //   //   group={groupCard.length}
    //   //   onDelete={null}
    //   // />);
    // }
  }
  return [];
};
