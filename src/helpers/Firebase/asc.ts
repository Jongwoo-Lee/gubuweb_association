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
  email: string | null;
  isVerified: boolean;
  name: string | null;
  phoneNumber: string | null;
  constructor(
    uid: string,
    name: string | undefined,
    email: string,
    isVerified: boolean,
    phoneNumber: string | undefined
  ) {
    this.name = name ?? null;
    this.uid = uid;
    this.email = email;
    this.isVerified = isVerified ?? false;
    this.phoneNumber = phoneNumber ?? null;
  }
  toString() {
    return this.uid + ", " + this.name + ", " + this.email;
  }
}

// Firestore data converter
export const ascConverter = {
  toFirestore: function(asc: Association) {
    return {
      [COL_ASC.DISPLAYNAME]: asc.name,
      [COL_ASC.EMAIL]: asc.email,
      [COL_ASC.ISVERIFIED]: asc.isVerified,
      [COL_ASC.PHONENUMBER]: asc.phoneNumber
    };
  },
  fromFirestore: function(
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions | undefined
  ) {
    const data = snapshot.data(options);
    return new Association(
      snapshot.id,
      data?.[COL_ASC.DISPLAYNAME],
      data?.[COL_ASC.EMAIL],
      data?.[COL_ASC.ISVERIFIED],
      data?.[COL_ASC.PHONENUMBER]
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
