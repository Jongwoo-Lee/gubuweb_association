import Firebase from "../Firebase";
import { COL_ASC } from "../../constants/firestore";
import firebase from "firebase";
import { teamInviteDocRef, ascTeamConverter } from "./team";
import { Team, Association } from "../../models";

// interface FirestoreAsc {
//   uid: string | null;
//   email: string | null;
//   isVerified: boolean;
//   name: string | null;
//   phoneNumber: number | null;
// }

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

// 1. ASC-tl 에 팀 정보 저장
// 2. Team-i-asc 에 초대 정보 저장
export const batchInviteTeam = (asc: Association, team: Team) => {
  const batch = Firebase.firestore.batch();
  const invitedAt = new Date();

  const batchTeam = Team.fromTeam(team);
  batchTeam.invitedAt = invitedAt;
  batchTeam.isVerified = batchTeam.isVerified ?? false;

  const ascRef = ascTeamListDocRef(asc.uid, batchTeam.uid);
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
  batch.set(
    teamRef,
    {
      [asc.uid]: {
        [COL_ASC.INVITEDAT]: invitedAt,
        [COL_ASC.DISPLAYNAME]: asc.name
      },
      [COL_ASC.RECENT_SENDER]: asc.uid
    },
    { merge: true }
  );

  return batch.commit();
};

// 1. ASC-tl 에서 팀 삭제
// 2. Team-i-asc 에 초대 정보 삭제
export const batchDeleteInviteTeam = (ascUID: string, team: Team) => {
  const batch = Firebase.firestore.batch();

  const ascRef = ascTeamListDocRef(ascUID, team.uid);
  batch.delete(ascRef);

  const teamRef = teamInviteDocRef(team.uid);
  batch.update(teamRef, { [ascUID]: Firebase.field.delete() });
  return batch.commit();
};

export const ascTeamListColRef = (ascUID: string) =>
  Firebase.firestore
    .collection(COL_ASC.ASSOC)
    .doc(ascUID)
    .collection(COL_ASC.MYTEAMLIST)
    .withConverter(ascTeamConverter);

const ascTeamListDocRef = (ascUID: string, teamUID: string) =>
  ascTeamListColRef(ascUID).doc(teamUID);
