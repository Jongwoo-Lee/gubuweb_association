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
