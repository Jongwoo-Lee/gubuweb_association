import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button, IconButton } from "@material-ui/core";
import { GroupCard } from "./GroupCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  firstComponent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-around"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    minWidth: 150,
    margin: "20px 20px"
  },
  title: {
    margin: "10px 10px" // top right bottom left
  },
  contents: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 10px"
  },
  setting: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 200,
    minWidth: 150,
    margin: "20px 20px"
  },
  subItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    minWidth: 150,
    margin: "5px 5px"
  }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface AddGroupCardProps {}

interface ControlProps {
  numOfItem: number;
  disPatchItem: React.Dispatch<React.SetStateAction<number>>;
}

const ControlComponent: React.FC<ControlProps> = ({
  numOfItem,
  disPatchItem
}: ControlProps) => {
  const handleMinusValue = () => {
    if (numOfItem > 1) {
      const newValue: number = numOfItem - 1;
      disPatchItem(newValue);
    }
  };
  const handleAddValue = () => {
    const newValue: number = numOfItem + 1;
    disPatchItem(newValue);
  };

  return (
    <div>
      <IconButton onClick={handleMinusValue}>-</IconButton>
      {numOfItem}
      <IconButton onClick={handleAddValue}>+</IconButton>
    </div>
  );
};

export const AddGroupComponent: React.FC<AddGroupCardProps> = ({}: AddGroupCardProps) => {
  const classes = useStyles();
  const [numOfTeams, setNumOfTeams] = useState(3);
  const [numOfAdvFinal, setNumOfAdvFinal] = useState(1); // Advanced to the final
  const [numOfRound, setNumOfRound] = useState(1);
  const [numOfWildCard, setNumOfWildCard] = useState(1);
  const [groupCard, setGroupCard] = useState<Array<JSX.Element>>(
    Array<JSX.Element>()
  );

  const handleMakeCard = () => {
    setGroupCard([
      ...groupCard,
      <GroupCard
        key={groupCard.length}
        numOfTeams={numOfTeams}
        group={groupCard.length}
      ></GroupCard>
    ]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.firstComponent}>
        <Card className={classes.card} variant="outlined" color="red">
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
              <ControlComponent
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
              <ControlComponent
                numOfItem={numOfAdvFinal}
                disPatchItem={setNumOfAdvFinal}
              />
            </Typography>
          </div>
          <Button onClick={handleMakeCard}>확인</Button>
        </Card>
        <div className={classes.setting}>
          <Typography align="center" variant="body1" component="span">
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
              <ControlComponent
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
              <ControlComponent
                numOfItem={numOfWildCard}
                disPatchItem={setNumOfWildCard}
              />
            </Typography>
          </div>
        </div>
      </div>
      {groupCard.length > 0 && groupCard.map(item => item)}
    </div>
  );
};
