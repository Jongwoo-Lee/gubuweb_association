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
