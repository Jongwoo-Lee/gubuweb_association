import { TeamsPos } from "../../../../helpers/Firebase/game";

export let dragObservers: { [pos: number]: string } | null = null;
export const setDragObservers = (posD: { [pos: number]: string } | null) => {
  dragObservers = posD;
};

let observers: PositionObserver[] = [];
export type PositionObserver =
  | ((position: { [pos: number]: string }) => void)
  | null;

function emitChange(pos: TeamsPos) {
  observers.forEach(o => o && o(pos));
}

export function observe(pos: TeamsPos, o: PositionObserver) {
  observers.push(o);
  emitChange(pos);

  return () => {
    observers = observers.filter(t => t !== o);
  };
}

// export function canMoveKnight(toX: number, toY: number) {
//   const [x, y] = knightPosition;
//   const dx = toX - x;
//   const dy = toY - y;
//   console.log(canMoveKnight);
//   console.log(`toX - ${toX} toY - ${toY}`);
//   console.log(`dx - ${dx} dy - ${dy}`);
//   return true;
// }

export function moveKnight(bPos: TeamsPos, pos: number) {
  let temp: string = "";
  let newPos: TeamsPos = JSON.parse(JSON.stringify(bPos));
  if (dragObservers !== null) {
    for (let key in dragObservers) {
      temp = newPos[key];
      delete newPos[key];

      Object.assign(newPos, { [pos]: temp });
    }
  }

  emitChange(newPos);
}
