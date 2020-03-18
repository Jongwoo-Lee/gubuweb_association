import { Player } from "./player";

export type TeamManager = { uid: string; name: string };
export class Team {
  uid: string;
  name: string;
  initial: string;
  manager: TeamManager; // key: uid, value: name
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
    manager: TeamManager,
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
    this.manager = { ...manager };
    this.region = info.region;
    this.gender = info.gender;
    this.age = info.age ? [...info.age] : undefined;
    this.logo = info.logo;
    this.invitedAt = info.invitedAt;
    this.isVerified = info.isVerified;
    this.isDeclined = info.isDeclined;
    this.joinedAt = info.joinedAt;
    this.players = info.players?.map(pl => Player.fromPlayer(pl));
  }

  static empty() {
    return new Team("", "", "", { uid: "", name: "" }, {});
  }

  static fromTeam(team: Team) {
    return new Team(
      team.uid,
      team.name,
      team.initial,
      { ...team.manager },
      {
        region: team.region,
        gender: team.gender,
        age: team.age ? [...team.age] : undefined,
        logo: team.logo,
        invitedAt: team.invitedAt,
        isVerified: team.isVerified,
        isDeclined: team.isDeclined,
        joinedAt: team.joinedAt,
        players: team.players?.map(player => Player.fromPlayer(player))
      }
    );
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
  return {
    "팀 이름": team.name,
    매니저: Object.values(team.manager).join(","),
    "활동 지역": team.region,
    연령대: team.age?.toString(),
    성별: team.gender
  };
};

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
