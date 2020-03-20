import Firebase from ".";
import { COL_CUP, COL_GAME } from "../../constants/firestore";
import { GameCard } from "../../context/game/game";
import { Score } from "../../context/cup/cupPlan";

export interface Log {
  createdBy: string;
  timeStamp: firebase.firestore.Timestamp;
}

export interface Substitution {
  [quarter: string]: {
    log: Log;
    player_curPosition: TeamsPos;
  };
}

export interface Goal {
  userUID: string;
  assist_userUID: string;
  timeStamp: number; // milliseconds
  quarter: number; // quarterIndex, curQuarter * 2 - 1
  goal_type: number;
  log: Log;
}

export interface Record {
  score?: Goal[];
  substitution?: Substitution;
  real_attendance?: string[];
  team?: string;
}

export class TeamsRecord {
  h: Record;
  a: Record;

  constructor(home?: Record, away?: Record) {
    this.h = home ?? {};
    this.a = away ?? {};
  }
}

export interface TeamsPos {
  [uid: number]: string;
}

export const recordConverter = {
  toFirestore: (record: TeamsRecord) => {
    return {
      [COL_GAME.HOME]: record.h,
      [COL_GAME.AWAY]: record.a
    };
  },
  fromFirestore: (
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new TeamsRecord(data?.[COL_GAME.HOME], data?.[COL_GAME.AWAY]);
  }
};

export const makeSubGame = async (
  cupUID: string,
  uID: string,
  round: number, // ex) A조 1경기, 2경기 3경기, or 8강 1경기 2경기 3경기 4경기
  gameCard: GameCard,
  group?: number // ex) A조 B조 C조 D조
) => {
  let returnGameID: string | null = "";
  let makeData: Function;
  if (typeof group === "undefined") {
    makeData = (gameUID: string) => {
      return { f: { [`${round}`]: { gid: gameUID } } };
    };
  } else {
    makeData = (gameUID: string) => {
      return { p: { [`${group}`]: { [`${round}`]: { gid: gameUID } } } };
    };
  }

  await Firebase.firestore
    .collection(COL_CUP.CUP)
    .doc(cupUID)
    .collection(COL_GAME.GAMES)
    .add({
      [COL_GAME.CREATEDAT]: Firebase.field.serverTimestamp(),
      [COL_GAME.CREATEDBY]: uID,
      [COL_GAME.ENDTIME]: null,
      [COL_GAME.GAMETYPE]: 2,
      [COL_GAME.LOCATION]: gameCard?.location ?? null,
      [COL_GAME.QUARTER]: gameCard.quarter,
      [COL_GAME.QUARTERTIME]: gameCard.gameTime,
      [COL_GAME.RESTTIME]: gameCard.restTime,
      [COL_GAME.STARTTIME]: gameCard?.kickOffTime ?? null,
      [COL_GAME.TEAM]:
        gameCard.team1 && gameCard.team2
          ? [gameCard.team1, gameCard.team2]
          : [],
      [COL_GAME.CUPID]: cupUID
    })
    .then(
      async (
        doc: firebase.firestore.DocumentReference<
          firebase.firestore.DocumentData
        >
      ) => {
        const saveData: Object = makeData(doc.id);
        returnGameID = doc.id;
        await Firebase.firestore
          .collection(COL_CUP.CUP)
          .doc(cupUID)
          .set(
            {
              [COL_CUP.MATCH]: saveData
            },
            { merge: true }
          )
          .catch(err => {
            console.log(`fail to save subGame info in Cup - ${cupUID} ${err}`);
            returnGameID = null;
          });
      }
    )
    .catch(err => {
      console.log(`fail to create subGame in Cup - ${cupUID} ${err}`);
      returnGameID = null;
    });

  return returnGameID;
};

export const getGameRecord = (cupID: string, gameID: string) =>
  Firebase.firestore
    .collection(COL_CUP.CUP)
    .doc(cupID)
    .collection(COL_GAME.GAMES)
    .doc(gameID)
    .collection(COL_GAME.DETAIL)
    .doc(COL_GAME.DETAIL)
    .withConverter(recordConverter)
    .get();

export const saveRecord = async (
  cupID: string,
  gameCard: GameCard,
  teamsRecord: TeamsRecord
) => {
  const score: Score = {
    hp: teamsRecord.h.score?.length ?? 0,
    ap: teamsRecord.a.score?.length ?? 0
  };

  const winner: string =
    score.hp > score.ap
      ? teamsRecord.h.team ?? "team1" // 항상 있는 것
      : score.hp < score.ap
      ? teamsRecord.a.team ?? "team2"
      : ""; /// 무승부 일 때 ""

  let makeData: Object;
  if (typeof gameCard.group === "undefined") {
    makeData = { f: { [`${gameCard.id}`]: { sc: score, w: winner } } };
  } else {
    makeData = {
      p: {
        [`${gameCard.group}`]: {
          [`${gameCard.id}`]: { sc: score, w: winner }
        }
      }
    };
  }

  const batch = Firebase.firestore.batch();
  batch.set(
    Firebase.firestore
      .collection(COL_CUP.CUP)
      .doc(cupID)
      .collection(COL_GAME.GAMES)
      .doc(gameCard.gid ?? "") // 항상 gid는 있음.
      .collection(COL_GAME.DETAIL)
      .doc(COL_GAME.DETAIL)
      .withConverter(recordConverter),
    teamsRecord,
    { merge: true }
  );

  batch.set(
    Firebase.firestore.collection(COL_CUP.CUP).doc(cupID),
    { [COL_CUP.MATCH]: makeData },
    {
      merge: true
    }
  );

  return await batch.commit();
};
