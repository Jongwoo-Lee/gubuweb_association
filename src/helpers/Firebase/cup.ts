import Firebase from "../Firebase";
import firebase from "firebase";
import { COL_CUP, COL_ASC } from "../../constants/firestore";

export class CupInfo {
  name: string;
  region: string;
  startDate: Date;
  endDate: Date;
  cupType: string;
  gender: string;
  createdAt: Date;
  createdBy: string;
  allowAthlete: string | null;
  athleteType: string | null;
  url: string | null;
  introduction: string | null;
  documents: string[] | null;
  selectedTeams: string[];

  constructor(
    name: string,
    region: string,
    startDate: Date,
    endDate: Date,
    cupType: string,
    gender: string,
    createdAt: Date,
    createdBy: string,
    allowAthlete: string | undefined,
    athleteType: string | undefined,
    url: string | undefined,
    introduction: string | undefined,
    documents: string[] | undefined,
    selectedTeams: string[] | undefined
  ) {
    this.name = name;
    this.region = region;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cupType = cupType;
    this.gender = gender;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.allowAthlete = allowAthlete ?? null;
    this.athleteType = athleteType ?? null;
    this.url = url ?? null;
    this.introduction = introduction ?? null;
    this.documents = documents ?? null;
    this.selectedTeams = selectedTeams ?? Array<string>();
  }
  toString() {
    return this.name + ", " + this.cupType;
  }
}

// Firestore data converter
export const cupInfoConverter = {
  toFirestore: (cup: CupInfo) => {
    return {
      [COL_CUP.CUPNAME]: cup.name,
      [COL_CUP.REGION]: cup.region,
      [COL_CUP.STARTDATE]: cup.startDate,
      [COL_CUP.ENDDATE]: cup.endDate,
      [COL_CUP.CUPTYPE]: cup.cupType,
      [COL_CUP.GENDER]: cup.gender,
      [COL_CUP.CREATEDAT]: cup.createdAt,
      [COL_CUP.CREATEDBY]: cup.createdBy,
      [COL_CUP.ALLOWATHLETE]: cup.allowAthlete,
      [COL_CUP.ATHLETETYPE]: cup.athleteType,
      [COL_CUP.URL]: cup.url,
      [COL_CUP.INTRODUCTION]: cup.introduction,
      [COL_CUP.DOCUMENTS]: cup.documents,
      [COL_CUP.TEAMS]: cup.selectedTeams
    };
  },
  fromFirestore: (
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new CupInfo(
      data?.[COL_CUP.CUPNAME],
      data?.[COL_CUP.REGION],
      data?.[COL_CUP.STARTDATE],
      data?.[COL_CUP.ENDDATE],
      data?.[COL_CUP.CUPTYPE],
      data?.[COL_CUP.GENDER],
      data?.[COL_CUP.CREATEDAT],
      data?.[COL_CUP.CREATEDBY],
      data?.[COL_CUP.ALLOWATHLETE],
      data?.[COL_CUP.ATHLETETYPE],
      data?.[COL_CUP.URL],
      data?.[COL_CUP.INTRODUCTION],
      data?.[COL_CUP.DOCUMENTS],
      data?.[COL_CUP.TEAMS]
    );
  }
};

export const setCupInfo = async (cup: CupInfo) => {
  const cupRef = Firebase.firestore
    .collection(COL_CUP.CUP)
    .doc()
    .withConverter(cupInfoConverter);

  const batch = Firebase.firestore.batch();
  batch.set(cupRef, cup);

  // asc 에 cup id 저장
  const ascRef = Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(cup.createdBy);
  batch.update(ascRef, { [COL_ASC.CUPLIST]: Firebase.arrayUnion(cupRef.id) });

  batch.commit().catch(err => console.log(err));
};

// save team uid
export const saveTeams = async (cupUID: string, teams: string[]) => {
  Firebase.firestore
    .collection(COL_CUP.CUP)
    .doc(cupUID)
    .update({
      [COL_CUP.TEAMS]: teams
    })
    .catch(err => console.log(`saveTeams error ${err}`));
};

export const getAscCupInfos = (cuplist: string[]) => {
  return Firebase.firestore
    .collection(COL_CUP.CUP)
    .where(Firebase.docID, "in", cuplist)
    .withConverter(cupInfoConverter)
    .get();
};
