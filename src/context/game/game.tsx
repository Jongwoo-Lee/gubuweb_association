import { Score } from "../cup/cupPlan";
import { firestore } from "firebase";

export class GameCard {
  team1: string | null;
  team2: string | null;
  id: number; // Game Card ID
  quarter: number; // not quarter INdex
  gameTime: number; // 단위: 분, gameTime
  restTime: number; // 단위: 분, restTime
  team1No?: number;
  team2No?: number;
  location?: string;
  kickOffTime?: firebase.firestore.Timestamp;
  group?: number; // final에는 없다.
  score?: Score; // score
  winner?: string; // winner uid , undefined-> 경기 하지 않은 상태, "" -> 비긴상태
  gid?: string;

  constructor(
    team1: string | null,
    team2: string | null,
    id: number,
    quarter: number,
    gameTime: number,
    restTime: number,
    team1No?: number,
    team2No?: number,
    location?: string,
    kickOffTime?: firebase.firestore.Timestamp,
    group?: number,
    score?: Score,
    winner?: string,
    gid?: string
  ) {
    this.team1 = team1;
    this.team2 = team2;
    this.id = id;
    this.quarter = quarter;
    this.gameTime = gameTime;
    this.restTime = restTime;
    this.location = location;
    this.team1No = team1No;
    this.team2No = team2No;
    this.kickOffTime = kickOffTime;
    this.group = group;
    this.score = score;
    this.winner = winner;
    this.gid = gid;
  }

  static fromGameCard(other: GameCard) {
    return new GameCard(
      other.team1,
      other.team2,
      other.id,
      other.quarter,
      other.gameTime,
      other.restTime,
      other.team1No,
      other.team2No,
      other.location,
      other.kickOffTime !== undefined
        ? firestore.Timestamp.fromMillis(other.kickOffTime.seconds * 1000)
        : undefined,
      other.group,
      other.score !== undefined
        ? { hp: other.score.hp, ap: other.score.ap }
        : undefined,
      other.winner,
      other.gid
    );
  }
}

export class TableData {
  name: string;
  point: number;
  win: number;
  draw: number;
  lose: number;
  diff: number;
  gainPoint: number;
  lossPoint: number;

  constructor(name: string) {
    this.name = name;
    this.point = 0;
    this.win = 0;
    this.draw = 0;
    this.lose = 0;
    this.diff = 0;
    this.gainPoint = 0;
    this.lossPoint = 0;
  }

  updateWin() {
    this.win += 1;
    this.point += 3;
  }
  updateLose() {
    this.lose += 1;
  }

  updateDraw() {
    this.point += 1;
    this.draw += 1;
  }

  static updateScore(t1: TableData, t2: TableData, score: Score) {
    const hp: number = score.hp;
    const ap: number = score.ap;

    t1.updateGetPoint(hp);
    t1.updateLossPoint(ap);
    t2.updateGetPoint(ap);
    t2.updateLossPoint(hp);
  }
  updateGetPoint(p: number) {
    this.gainPoint += p;
    this.diff = this.gainPoint - this.lossPoint;
  }

  updateLossPoint(p: number) {
    this.lossPoint += p;
    this.diff = this.gainPoint - this.lossPoint;
  }

  //   { id: "group", label: "조" },
  //   { id: "point", label: "승점" },
  //   { id: "win", label: "승" },
  //   { id: "draw", label: "무" },
  //   { id: "lose", label: "패" },
  //   { id: "diff", label: "차" },
  //   { id: "gainPoint", label: "득" },
  //   { id: "lossPoint", label: "실" }
  // ];

  value(test: string) {
    switch (test) {
      case "group":
        return this.name;
      case "point":
        return this.point;
      case "win":
        return this.win;
      case "draw":
        return this.draw;
      case "lose":
        return this.lose;
      case "diff":
        return this.diff;
      case "gainPoint":
        return this.gainPoint;
      case "lossPoint":
        return this.lossPoint;
    }
  }
}
