import Firebase from ".";
import { COL_CUP, COL_GAME } from "../../constants/firestore";

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
