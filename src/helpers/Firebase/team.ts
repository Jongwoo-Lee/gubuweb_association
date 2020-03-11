import Firebase from ".";
import { COL_TEAMS, COL_ASC } from "../../constants/firestore";
import { firestore } from "firebase";

export class Team {
  uid: string;
  name: string;
  initial: string;
  manager: Object; // key: uid, value: name
  region: string | undefined;
  gender: string | undefined;
  age: string[] | undefined;
  logo: string | undefined;
  invitedAt: Date | undefined;
  isVerified: boolean | undefined;

  constructor(
    teamUID: string,
    teamName: string,
    teamInitial: string,
    manager: Object,
    info: {
      region?: string;
      gender?: string;
      age?: string[];
      logo?: string;
      invitedAt?: Date;
      isVerified?: boolean;
    }
  ) {
    this.uid = teamUID;
    this.name = teamName;
    this.initial = teamInitial;
    this.manager = manager;
    this.region = info.region ?? undefined;
    this.gender = info.gender ?? undefined;
    this.age = info.age ?? undefined;
    this.logo = info.logo ?? undefined;
    this.invitedAt = info.invitedAt ?? undefined;
    this.isVerified = info.isVerified ?? undefined;
  }

  parseValue(value: string): string | string[] {
    let returnV: string | string[];
    switch (value) {
      case "name":
        returnV = this.name;
        break;

      case "manager":
        returnV = Object.values(this.manager);
        break;

      case "region":
        returnV = this.region ?? "";
        break;

      case "age":
        returnV = this.age ?? "";
        break;

      case "gender":
        returnV = this.gender ?? "";
        break;
      default:
        returnV = "";
    }

    return returnV;
  }
}

export const getTeamInfo = (team: Team) => {
  const teamScope: string[] = [
    "매니저",
    "팀 이름",
    "활동 지역",
    "팀 연령",
    "팀 성별"
  ];
  const managers: string[] = Object.values(team.manager);
  const teamValue = [
    managers.join(","),
    team.name,
    team.region,
    "10대", //team.age,
    team.gender
  ];
  let teamInfo: Map<string, string> = new Map<string, string>();

  for (let i = 0; i < teamScope.length; i++)
    teamInfo.set(teamScope[i], teamValue[i] ?? "");

  return teamInfo;
};

export const ascTeamConverter = {
  toFirestore: (team: Team) => {
    return {
      [COL_TEAMS.TEAMS_NAME]: team.name,
      [COL_TEAMS.TEAMS_MANAGER]: team.manager,
      [COL_TEAMS.TEAMS_INITIAL]: team.initial,
      [COL_TEAMS.TEAMS_LOGO]: team.logo ?? "",
      [COL_TEAMS.TEAMS_AGE]: team.age ?? [],
      [COL_TEAMS.TEAMS_REGION]: team.region ?? "",
      [COL_TEAMS.TEAMS_GENDER]: team.gender ?? "",
      [COL_ASC.INVITEDAT]: team.invitedAt,
      [COL_ASC.ISVERIFIED]: team.isVerified
    };
  },
  fromFirestore: (
    snapshot: firebase.firestore.DocumentSnapshot,
    options: firebase.firestore.SnapshotOptions | undefined
  ) => {
    const data = snapshot.data(options);
    return new Team(
      snapshot.id,
      data?.[COL_TEAMS.TEAMS_NAME],
      data?.[COL_TEAMS.TEAMS_INITIAL],
      data?.[COL_TEAMS.TEAMS_MANAGER],
      {
        region: data?.[COL_TEAMS.TEAMS_REGION],
        gender: data?.[COL_TEAMS.TEAMS_GENDER],
        age: data?.[COL_TEAMS.TEAMS_AGE],
        logo: data?.[COL_TEAMS.TEAMS_LOGO],
        invitedAt: data?.[COL_ASC.INVITEDAT],
        isVerified: data?.[COL_ASC.ISVERIFIED]
      }
    );
  }
};

const makeTeamfromDoc = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Team => {
  const data: firebase.firestore.DocumentData = doc.data();

  return new Team(
    doc.id,
    data[COL_TEAMS.TEAMS_NAME],
    data[COL_TEAMS.TEAMS_INITIAL],
    data[COL_TEAMS.TEAMS_MANAGER],
    {
      region: data?.[COL_TEAMS.TEAMS_REGION],
      gender: data?.[COL_TEAMS.TEAMS_GENDER],
      age: data?.[COL_TEAMS.TEAMS_AGE],
      logo: data?.[COL_TEAMS.TEAMS_LOGO],
      invitedAt: data?.[COL_ASC.INVITEDAT],
      isVerified: data?.[COL_ASC.ISVERIFIED]
    }
  );
};

export const searchTeams = (search: string) =>
  Firebase.firestore
    .collection(COL_TEAMS.TEAMS_TEST4)
    .orderBy(COL_TEAMS.TEAMS_LOWERCASE)
    .startAt(search.toLowerCase())
    .endAt(search.toLowerCase() + "\uf8ff")
    .get()
    .then(
      (
        query: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      ) =>
        query.docs.map(
          (
            value: firebase.firestore.QueryDocumentSnapshot<
              firebase.firestore.DocumentData
            >
          ) => makeTeamfromDoc(value)
        )
    );

export const getAscTeams = (teamUIDList: string[]) => {
  Firebase.firestore
    .collection(COL_TEAMS.TEAMS_TEST4)
    .where("id", "in", teamUIDList)
    .withConverter(ascTeamConverter)
    .get();
};

export const teamInviteDocRef = (teamUID: string) =>
  Firebase.firestore
    .collection(COL_TEAMS.TEAMS_TEST4)
    .doc(teamUID)
    .collection(COL_TEAMS.INVITE)
    .doc(COL_TEAMS.TEAMS_ASC);
