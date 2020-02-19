import Firebase from "../Firebase";
import { COL_ASC } from "../../constants/firestore";
import firebase from "firebase";

// interface FirestoreAsc {
//   uid: string | null;
//   email: string | null;
//   isVerified: boolean;
//   name: string | null;
//   phoneNumber: number | null;
// }

export class Association {
  uid: string;
  email: string;
  isVerified: boolean;
  name: string | null;
  phoneNumber: string | null;
  url: string | null;
  introduction: string | null;

  constructor(
    uid: string,
    name: string | undefined | null,
    email: string,
    isVerified: boolean,
    phoneNumber: string | undefined | null,
    url?: string | undefined | null,
    introduction?: string | undefined | null
  ) {
    this.name = name ?? null;
    this.uid = uid;
    this.email = email;
    this.isVerified = isVerified ?? false;
    this.phoneNumber = phoneNumber ?? null;
    this.url = url ?? null;
    this.introduction = introduction ?? null;
  }

  toString() {
    return this.uid + ", " + this.name + ", " + this.email;
  }
}

// Firestore data converter
export const ascConverter = {
  toFirestore: (asc: Association) => {
    return {
      [COL_ASC.DISPLAYNAME]: asc.name,
      [COL_ASC.EMAIL]: asc.email,
      [COL_ASC.ISVERIFIED]: asc.isVerified,
      [COL_ASC.PHONENUMBER]: asc.phoneNumber,
      [COL_ASC.URL]: asc.url,
      [COL_ASC.INTRODUCTION]: asc.introduction
    };
  },
  fromFirestore: (
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new Association(
      snapshot.id,
      data?.[COL_ASC.DISPLAYNAME],
      data?.[COL_ASC.EMAIL],
      data?.[COL_ASC.ISVERIFIED],
      data?.[COL_ASC.PHONENUMBER],
      data?.[COL_ASC.URL],
      data?.[COL_ASC.INTRODUCTION]
    );
  }
};

export const getAscData = async (ascID: string) => {
  var ascQuery;
  // Association;
  ascQuery = await Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(ascID)
    .withConverter(ascConverter)
    .get();

  console.log("get asc data");

  return ascQuery?.data() ?? null;
};

export const setAscData = async (asc: Association) =>
  Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(asc.uid)
    .withConverter(ascConverter)
    .set(asc)
    .catch(err => {
      throw err;
    });

export const updateURL = async (uid: string, url: string) =>
  Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(uid)
    .set(
      {
        [COL_ASC.URL]: url
      },
      { merge: true }
    )
    .catch(err => {
      throw err;
    });
