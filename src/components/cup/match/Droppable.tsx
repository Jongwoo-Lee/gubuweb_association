import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { BracketLine } from "./BracketLine";
import {
  useSetFinalTeams,
  useFinalTeams,
  FinalDataStructure
} from "../../../context/cup/cupMatch";

const useStyles = makeStyles(() =>
  createStyles({
    drop: {
      border: "1px solid black",
      width: "200px",
      height: "30px",
      borderColor: "black"
    },
    dropStack: {
      backgroundColor: "#555",
      width: "250px",
      height: "400px",
      margin: "32px"
    },
    abs: {
      position: "relative"
    },
    gap: {
      height: "30px"
    }
  })
);

interface DroppableWrapperProps {
  numOfBoxes: number;
  teamList: Array<string>; // 팀이 아닌 놈들이 드래그 앤드랍 되는 것을 막음
}

export const DroppableWrapper: React.FC<DroppableWrapperProps> = ({
  numOfBoxes,
  teamList
}: DroppableWrapperProps) => {
  const classes = useStyles();
  const lines: Array<JSX.Element> = makeBracketLine(numOfBoxes);

  return (
    <div className={classes.abs}>
      {[...Array(numOfBoxes).keys()].map(i => (
        <div id={`${i}`}>
          <Droppable key={`${i}`} index={i} teamList={teamList} />
          {i % 2 === 1 && <div className={classes.gap} />}
        </div>
      ))}
      {lines}
    </div>
  );
};

interface BracketMeta {
  left: number;
  top: number;
  height: number;
}

const makeBracketLine = (numOfBoxes: number): Array<JSX.Element> => {
  const numOfLines: number = numOfBoxes / 2 - 1;
  let order: number = Math.log2(numOfBoxes / 4);
  let measures: Array<BracketMeta> = Array<BracketMeta>(numOfLines);

  const boxWidth: number = 200;
  const lineWidth: number = 100;
  const boxHeight: number = 30;

  for (let i = order; i >= 0; i--) {
    for (let j = Math.pow(2, i + 1) - 1; j >= Math.pow(2, i); j--) {
      if (typeof measures[j * 2] === "undefined") {
        if (typeof measures[j + 1] === "undefined") {
          measures[j] = {
            height: boxHeight * 3 + 1 + 1,
            top: boxHeight - 1,
            left: boxWidth
          };
        } else {
          measures[j] = {
            height: measures[j + 1].height,
            top: measures[j + 1].top + 6 * boxHeight,
            left: measures[j + 1].left
          };
        }
      } else {
        const standard1: BracketMeta = measures[j * 2 + 1];
        const standard2: BracketMeta = measures[j * 2];
        const newTop: number = standard1.top + standard1.height / 2;
        const newBottom: number = standard2.top + standard2.height / 2;

        measures[j] = {
          height: newBottom - newTop,
          top: newTop,
          left: standard1.left + lineWidth
        };
      }
    }
  }

  return measures.map(obj => {
    return (
      <BracketLine
        height={`${obj.height}px`}
        top={`${obj.top}px`}
        left={`${obj.left}px`}
        width={`${lineWidth}px`}
      />
    );
  });
};

interface DroppableProps {
  index: number;
  teamList: Array<string>; // 팀이 아닌 놈들이 드래그 앤드랍 되는 것을 막음
}

export const Droppable: React.FC<DroppableProps> = ({
  index,
  teamList
}: DroppableProps) => {
  const classes = useStyles();

  const final = useFinalTeams();
  const arrangeTeam: string[] = final["order"];
  const setArrageTeam: Dispatch<SetStateAction<
    FinalDataStructure
  >> = useSetFinalTeams();

  const handleDrop = (e: any) => {
    e.preventDefault();
    const src = e.dataTransfer.getData("text/plain");
    const fIdx: number = teamList.findIndex(findTeam => findTeam === src);

    // find current Team List
    if (fIdx > -1) {
      let newpTeams: FinalDataStructure = JSON.parse(JSON.stringify(final));
      const tIdx: number = arrangeTeam.findIndex(findTeam => findTeam === src);
      const newArr: Array<string> = [...arrangeTeam];

      newArr[index] = src;
      if (tIdx > -1) newArr[tIdx] = "";
      newpTeams["order"] = newArr;

      setArrageTeam(newpTeams);
    }
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={classes.drop}
      onDrop={event => handleDrop(event)}
      onDragOver={handleAllowDrop}
    >
      {arrangeTeam[index] && <div>{arrangeTeam[index]}</div>}
    </div>
  );
};
