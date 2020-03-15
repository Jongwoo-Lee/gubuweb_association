import React from "react";
import { useDrop } from "react-dnd";
import { Square } from "./Square";
import { moveKnight } from "./Game";
import ItemTypes from "./ItemTypes";
import Overlay from "./Overlay";
import { TeamsPos } from "../../../../helpers/Firebase/game";

export interface BoardSquareProps {
  id: number;
  pos: TeamsPos;
  children: any;
}

export const BoardSquare: React.FC<BoardSquareProps> = ({
  id,
  pos,
  children
}: BoardSquareProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    // canDrop: () => canMoveKnight(x, y),
    // begin?: (monitor: DragSourceMonitor) => DragObject | undefined | void;
    canDrop: () => true,
    drop: () => moveKnight(pos, id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%"
      }}
    >
      <Square black={false}>{children}</Square>
      {isOver && canDrop && <Overlay />}
    </div>
  );
};
