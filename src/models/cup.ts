import { CupMatchInfo } from "../context/cup/cupMatch";
import { CupPlanDataStructure } from "../context/cup/cupPlan";

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
  matchInfo: CupMatchInfo | null;
  matchPlan: CupPlanDataStructure | null;

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
    selectedTeams: string[] | undefined,
    matchInfo: CupMatchInfo | null,
    matchPlan: CupPlanDataStructure | null
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
    this.matchInfo = matchInfo ?? null;
    this.matchPlan = matchPlan ?? null;
  }
  toString() {
    return this.name + ", " + this.cupType;
  }
}
