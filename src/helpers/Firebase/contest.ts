import React from "react";
import { FORMTEXT } from "../../constants/texts";

export class ContestRegister {
  name: string;
  region: string;
  startDate: Date;
  endDate: Date;
  cupType: string | null;
  gender: string | null;
  allowAthlete: string | null;
  url: string | null;
  introduction: string | null;

  constructor(
    name: string,
    region: string,
    startDate: Date,
    endDate: Date,
    cupType?: string | undefined,
    gender?: string | undefined,
    allowAthlete?: string | undefined,
    url?: string | undefined,
    introduction?: string | undefined
  ) {
    this.name = name;
    this.region = region;
    this.startDate = startDate;
    this.endDate = endDate;
    this.cupType = cupType ?? null;
    this.gender = gender ?? null;
    this.allowAthlete = allowAthlete ?? null;
    this.url = url ?? null;
    this.introduction = introduction ?? null;
  }
  toString() {
    return this.name + ", " + this.cupType;
  }
}
