import Firebase from ".";
import { COL_CUP, COL_GAME } from "../../constants/firestore";

export interface Log {
  createdBy: string;
  timeStamp: firebase.firestore.Timestamp;
}

export interface Substitution {
  [quarter: string]: {
    log: Log;
    player_curPosition: {
      [uid: string]: number;
    };
  };
}

export interface Score {
  userUID: string;
  assist_userUID: string;
  timeStamp: number; // milliseconds
  quarter: number; // quarterIndex, curQuarter * 2 - 1
  goal_type: number;
  log: Log;
}

export class Record {
  score: Score[];
  substitution: Substitution[];
  real_attendance: string[];

  constructor(
    score?: Score[],
    substitution?: Substitution[],
    real_attendance?: string[]
  ) {
    this.score = score ?? [];
    this.substitution = substitution ?? [];
    this.real_attendance = real_attendance ?? [];
  }
}

export class TeamsRecord {
  h: Record;
  a: Record;

  constructor(home?: Record, away?: Record) {
    this.h = home ?? new Record();
    this.a = away ?? new Record();
  }
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
  group?: number // ex) A조 B조 C조 D조
) => {
  let returnGameID: string | null = "";
  let makeData: any;
  if (group === undefined) {
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
      [COL_GAME.LOCATION]: null,
      [COL_GAME.QUARTER]: 2,
      [COL_GAME.QUARTERTIME]: 45,
      [COL_GAME.RESTTIME]: 20,
      [COL_GAME.STARTTIME]: null,
      [COL_GAME.TEAM]: [],
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
