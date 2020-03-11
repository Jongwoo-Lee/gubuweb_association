import Firebase from "../Firebase";
import { COL_ASC, COL_TEAMS } from "../../constants/firestore";
import firebase from "firebase";
import { teamInviteDocRef, Team, ascTeamConverter } from "./team";

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
  myTeamList: string[] | undefined;
  cupList: string[] | undefined;

  constructor(
    uid: string,
    name: string | undefined | null,
    email: string,
    isVerified: boolean,
    phoneNumber: string | undefined | null,
    url?: string | undefined | null,
    introduction?: string | undefined | null,
    myTeamList?: string[] | undefined,
    cupList?: string[] | undefined
  ) {
    this.uid = uid;
    this.name = name ?? null;
    this.email = email;
    this.isVerified = isVerified ?? false;
    this.phoneNumber = phoneNumber ?? null;
    this.url = url ?? null;
    this.introduction = introduction ?? null;
    this.myTeamList = myTeamList ?? undefined;
    this.cupList = cupList ?? undefined;
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
      data?.[COL_ASC.INTRODUCTION],
      data?.[COL_ASC.MYTEAMLIST],
      data?.[COL_ASC.CUPLIST]
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

export const batchInviteTeam = (ascUID: string, team: Team) => {
  const batch = Firebase.firestore.batch();
  const invitedAt = new Date();

  const batchTeam = Team.fromTeam(team);
  batchTeam.invitedAt = invitedAt;
  batchTeam.isVerified = batchTeam.isVerified ?? false;

  const ascRef = ascTeamListDocRef(ascUID, batchTeam.uid);
  batch.set(
    ascRef,
    batchTeam,
    { merge: true }
    // {
    //   [COL_ASC.INVITEDAT]: invitedAt,
    //   [COL_ASC.ISVERIFIED]: false,
    //   [COL_TEAMS.TEAMS_LOGO]: team.logo,
    //   [COL_TEAMS.TEAMS_NAME]: team.name,
    //   [COL_TEAMS.TEAMS_AGE]: team.age,
    //   [COL_TEAMS.TEAMS_GENDER]: team.gender,
    //   [COL_TEAMS.TEAMS_MANAGER]: team.manager,
    //   [COL_TEAMS.TEAMS_REGION]: team.region,
    //   [COL_TEAMS.TEAMS_INITIAL]: team.initial
    // },
  );

  const teamRef = teamInviteDocRef(batchTeam.uid);
  batch.set(teamRef, { [ascUID]: invitedAt }, { merge: true });

  return batch.commit();
};

export const batchDeleteInviteTeam = (ascUID: string, team: Team) => {
  const batch = Firebase.firestore.batch();
};

export const ascTeamListColRef = (ascUID: string) =>
  Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(ascUID)
    .collection(COL_ASC.MYTEAMLIST)
    .withConverter(ascTeamConverter);

const ascTeamListDocRef = (ascUID: string, teamUID: string) =>
  ascTeamListColRef(ascUID).doc(teamUID);
