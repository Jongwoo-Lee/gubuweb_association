import React from "react";
import { DragPreviewImage, useDrag, DragSourceMonitor } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { moveKnight, dragObservers, setDragObservers } from "./Game";

const knightStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move"
};

interface PlayerProps {
  id: number;
  name: string;
}

export const Player: React.FC<PlayerProps> = ({ id, name }: PlayerProps) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.PLAYER },
    begin: (monitor: DragSourceMonitor) => {
      setDragObservers({ [`${id}`]: name });
    },
    end: () => {
      setDragObservers(null);
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <>
      {/* <DragPreviewImage connect={preview} src={knightImage} /> */}
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1
        }}
      >
        ㅁ
      </div>
    </>
  );
};
