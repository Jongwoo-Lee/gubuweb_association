import Firebase from ".";
import { COL_TEAMS, COL_ASC } from "../../constants/firestore";

import { Player, Team, TeamManager } from "../../models";

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
      [COL_TEAMS.TEAMS_MANAGER]: { [team.manager.uid]: team.manager.name },
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
      managerFromFirestore(data),
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

const managerFromFirestore = (
  docData: firebase.firestore.DocumentData | undefined
) => {
  let manager: TeamManager = { uid: "", name: "" };

  if (docData?.[COL_TEAMS.TEAMS_MANAGER]) {
    const mngObj = docData?.[COL_TEAMS.TEAMS_MANAGER];

    for (const uid in mngObj) {
      if (mngObj.hasOwnProperty(uid)) {
        manager = { uid: uid, name: mngObj[uid] };
      }
    }
  }
  return manager;
};

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
              image: value?.[COL_ASC.TEAM_PLAYER_IMAGE],
              status: value?.[COL_ASC.TEAM_PLAYER_STATUS],
              remark: value?.[COL_ASC.TEAM_PLAYER_REMARK],
              approveDate: value?.[COL_ASC.TEAM_PLAYER_APPROVE_DATE],
              approveExpire: value?.[COL_ASC.TEAM_PLAYER_APPROVE_EXPIRE]
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
      st?: number;
      rk?: string;
      ad?: Date;
      ae?: Date;
    };
  } = {};
  players.forEach(pl => {
    members[pl.uid] = {
      uu: pl.uid,
      dn: pl.name,
      bn: pl.backnumber,
      pu: pl.image,
      st: pl.status,
      rk: pl.remark,
      ad: pl.approveDate,
      ae: pl.approveExpire
    };
  });
  return members;
};
