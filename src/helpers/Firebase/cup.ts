import React from "react";
import { FORMTEXT } from "../../constants/texts";
import { COL_ASC } from "../../constants/firestore";

export class Cup {
  name: string;
  region: string;
  startDate: Date;
  endDate: Date;
  cupType: string;
  gender: string;
  allowAthlete: string | null;
  url: string | null;
  introduction: string | null;
  documents: string[] | null;

  constructor(
    name: string,
    region: string,
    startDate: Date,
    endDate: Date,
    cupType: string,
    gender: string,
    allowAthlete?: string | undefined,
    url?: string | undefined,
    introduction?: string | undefined,
    documents?: string[] | undefined
  ) {
    this.name = name;
    this.region = region;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cupType = cupType;
    this.gender = gender;
    this.allowAthlete = allowAthlete ?? null;
    this.url = url ?? null;
    this.introduction = introduction ?? null;
    this.documents = documents ?? null;
  }
  toString() {
    return this.name + ", " + this.cupType;
  }
}

// Firestore data converter
// export const ascConverter = {
//   toFirestore: function(cup: Cup) {
//     return {
//       [COL_ASC.DISPLAYNAME]: asc.name,
//       [COL_ASC.EMAIL]: asc.email,
//       [COL_ASC.ISVERIFIED]: asc.isVerified,
//       [COL_ASC.PHONENUMBER]: asc.phoneNumber,
//       [COL_ASC.URL]: asc.url,
//       [COL_ASC.INTRODUCTION]: asc.introduction
//     };
//   },
//   fromFirestore: function(
//     snapshot: firebase.firestore.DocumentSnapshot,
//     options: firebase.firestore.SnapshotOptions | undefined
//   ) {
//     const data = snapshot.data(options);
//     return new Cup(
//       snapshot.id,
//       data?.[COL_ASC.DISPLAYNAME],
//       data?.[COL_ASC.EMAIL],
//       data?.[COL_ASC.ISVERIFIED],
//       data?.[COL_ASC.PHONENUMBER],
//       data?.[COL_ASC.URL],
//       data?.[COL_ASC.INTRODUCTION]
//     );
//   }
// };
