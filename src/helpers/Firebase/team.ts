import Firebase from ".";
import { COL_TEAMS, COL_ASC } from "../../constants/firestore";

import { Player } from "../../models";

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
  isDeclined: boolean | undefined;
  joinedAt: Date | undefined;
  players: Player[] | undefined;

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
      isDeclined?: boolean;
      joinedAt?: Date;
      players?: Player[];
    }
  ) {
    this.uid = teamUID;
    this.name = teamName;
    this.initial = teamInitial;
    this.manager = manager;
    this.region = info.region;
    this.gender = info.gender;
    this.age = info.age;
    this.logo = info.logo;
    this.invitedAt = info.invitedAt;
    this.isVerified = info.isVerified;
    this.isDeclined = info.isDeclined;
    this.joinedAt = info.joinedAt;
    this.players = info.players;
  }

  static fromTeam(team: Team) {
    return new Team(team.uid, team.name, team.initial, team.manager, {
      region: team.region,
      gender: team.gender,
      age: team.age,
      logo: team.logo,
      invitedAt: team.invitedAt,
      isVerified: team.isVerified,
      isDeclined: team.isDeclined,
      joinedAt: team.joinedAt,
      players: team.players
    });
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
  // const teamScope: string[] = [
  //   "팀 이름",
  //   "매니저",
  //   "활동 지역",
  //   "연령대",
  //   "성별"
  // ];
  // const managers: string[] = Object.values(team.manager);
  // const teamValue = [
  //   team.name,
  //   managers.join(","),
  //   team.region,
  //   team.age?.toString(),
  //   team.gender
  // ];
  // let teamInfo: Map<string, string> = new Map<string, string>();

  // for (let i = 0; i < teamScope.length; i++)
  //   teamInfo.set(teamScope[i], teamValue[i] ?? "");

  return {
    "팀 이름": team.name,
    매니저: Object.values(team.manager).join(","),
    "활동 지역": team.region,
    연령대: team.age?.toString(),
    성별: team.gender
  };
};

export const ascTeamConverter = {
  toFirestore: (team: Team) => {
    return {
      [COL_TEAMS.TEAMS_NAME]: team.name,
      [COL_TEAMS.TEAMS_MANAGER]: team.manager,
      [COL_TEAMS.TEAMS_INITIAL]: team.initial,
      [COL_TEAMS.TEAMS_LOGO]: team.logo ?? null,
      [COL_TEAMS.TEAMS_AGE]: team.age ?? [],
      [COL_TEAMS.TEAMS_REGION]: team.region ?? null,
      [COL_TEAMS.TEAMS_GENDER]: team.gender ?? null,
      [COL_ASC.INVITEDAT]: team.invitedAt,
      [COL_ASC.ISVERIFIED]: team.isVerified ?? false,
      [COL_ASC.ISDECLINED]: team.isDeclined ?? null,
      [COL_ASC.JOINED_AT]: team.joinedAt ?? null,
      [COL_ASC.TEAM_MEMBERS]: team.players
        ? playersToFirestore(team.players)
        : null
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
        isVerified: data?.[COL_ASC.ISVERIFIED],
        isDeclined: data?.[COL_ASC.ISDECLINED],
        joinedAt: data?.[COL_ASC.JOINED_AT],
        players: playersFromFirestore(data)
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
      isVerified: data?.[COL_ASC.ISVERIFIED],
      isDeclined: data?.[COL_ASC.ISDECLINED],
      joinedAt: data?.[COL_ASC.JOINED_AT]
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

const playersFromFirestore = (
  docData: firebase.firestore.DocumentData | undefined
) => {
  let players: Player[] = [];
  if (docData?.[COL_ASC.TEAM_MEMBERS]) {
    const playersObject = docData?.[COL_ASC.TEAM_MEMBERS];

    for (const uid in playersObject) {
      if (playersObject.hasOwnProperty(uid)) {
        var value = playersObject[uid];

        players.push(
          new Player(
            value?.[COL_ASC.TEAM_PLAYER_UID],
            value?.[COL_ASC.TEAM_PLAYER_NAME],
            {
              backnumber: value?.[COL_ASC.TEAM_PLAYER_NUM],
              image: value?.[COL_ASC.TEAM_PLAYER_IMAGE]
            }
          )
        );
      }
    }
  }
  return players;
};

const playersToFirestore = (players: Player[]) => {
  let members: {
    [uid: string]: {
      uu: string;
      dn: string;
      bn?: number;
      pu?: string;
    };
  } = {};
  players.forEach(pl => {
    members[pl.uid] = {
      uu: pl.uid,
      dn: pl.name,
      bn: pl.backnumber,
      pu: pl.image
    };
  });
  return members;
};
