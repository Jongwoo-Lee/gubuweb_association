import Firebase from ".";
import { COL_TEAMS, COL_ASC } from "../../constants/firestore";

import { Player, Team, TeamManager, PlayerStatus } from "../../models";

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
      [COL_TEAMS.TEAM_MEMBERS]: team.players
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
    .withConverter(ascTeamConverter)
    .get()
    .then((query: firebase.firestore.QuerySnapshot<Team>) =>
      query.docs.map(doc => doc.data())
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
  if (docData?.[COL_TEAMS.TEAM_MEMBERS]) {
    const plObj = docData?.[COL_TEAMS.TEAM_MEMBERS];

    for (const uid in plObj) {
      if (plObj.hasOwnProperty(uid)) {
        var value = plObj[uid];

        players.push(
          new Player(
            value?.[COL_TEAMS.TEAM_PLAYER_UID],
            value?.[COL_TEAMS.TEAM_PLAYER_NAME],
            {
              backnumber: value?.[COL_TEAMS.TEAM_PLAYER_NUM],
              image: value?.[COL_TEAMS.TEAM_PLAYER_IMAGE],
              status: statusFromFirestore(value),
              remark: value?.[COL_TEAMS.TEAM_PLAYER_REMARK],
              approve: value?.[COL_TEAMS.TEAM_PLAYER_APPROVE],
              approveDate: value?.[COL_TEAMS.TEAM_PLAYER_APPROVE_DATE],
              approveExpire: value?.[COL_TEAMS.TEAM_PLAYER_APPROVE_EXPIRE]
            }
          )
        );
      }
    }
  }
  return players;
};

const statusFromFirestore = (player: any) => {
  let status: PlayerStatus = {
    wait: false,
    doc: false,
    pro: false,
    deny: false,
    expire: false
  };

  if (player?.[COL_TEAMS.TEAM_PLAYER_STATUS]) {
    const stObj = player?.[COL_TEAMS.TEAM_PLAYER_STATUS];

    status.wait = stObj[COL_TEAMS.TEAM_PLAYER_STATUS_WAIT] ?? false;
    status.doc = stObj[COL_TEAMS.TEAM_PLAYER_STATUS_DOC] ?? false;
    status.pro = stObj[COL_TEAMS.TEAM_PLAYER_STATUS_PRO] ?? false;
    status.deny = stObj[COL_TEAMS.TEAM_PLAYER_STATUS_DENY] ?? false;
    status.expire = stObj[COL_TEAMS.TEAM_PLAYER_STATUS_EXPIRE] ?? false;
  }
  return status;
};

const playersToFirestore = (players: Player[]) => {
  let members: {
    [uid: string]: {
      uu: string;
      dn: string;
      bn?: number;
      pu?: string;
      st?: {
        wt?: boolean;
        dc?: boolean;
        pr?: boolean;
        de?: boolean;
        ex?: boolean;
      };
      rk?: string;
      ap?: boolean;
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
      st: statusToFirestore(pl.status),
      rk: pl.remark,
      ap: pl.approve,
      ad: pl.approveDate,
      ae: pl.approveExpire
    };
  });
  return members;
};

const statusToFirestore = (status: PlayerStatus | undefined) => {
  return {
    wt: status?.wait,
    dc: status?.doc,
    pr: status?.pro,
    de: status?.deny,
    ex: status?.expire
  };
};
