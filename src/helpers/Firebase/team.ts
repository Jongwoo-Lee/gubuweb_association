import Firebase from ".";
import { COL_TEAMS } from "../../constants/firestore";




export class Team {
    uid: string;
    name: string;
    initial: string;
    manager: Object; // key: uid, value: name
    region: string | null;
    gender: string | null;
    age: string | null;
    logo: string | null;

    constructor(
        teamUID: string,
        teamName: string,
        teamInitial: string,
        manager: Object,
        region: string | null | undefined,
        gender: string | null | undefined,
        age: string | null | undefined,
        logo: string | null | undefined,
    ) {
        this.uid = teamUID;
        this.name = teamName;
        this.initial = teamInitial;
        this.manager = manager;
        this.region = region ?? null;
        this.gender = gender ?? null;
        this.age = age ?? null;
        this.logo = logo ?? null;
    }

    parseValue(value: string): string | string[] {
        let returnV: string | string[];
        switch (value) {
            case 'name':
                returnV = this.name;
                break;

            case 'manager':
                returnV = Object.values(this.manager);
                break;

            case 'region':
                returnV = this.region ?? "";
                break;

            case 'age':
                returnV = this.age ?? "";
                break;

            case 'gender':
                returnV = this.gender ?? "";
                break;
            default:
                returnV = "";

        }

        return returnV;
    }
}

export const getTeamInfo = function (
    team: Team
): Map<string, string> {
    const teamScope: string[] = ['매니저', '팀 이름', '활동 지역', '팀 연령', '팀 성별'];
    const managers: string[] = Object.values(team.manager);
    const teamValue: (string | null)[] = [managers.join(','), team.name, team.region, team.age, team.gender];
    let teamInfo: Map<string, string> = new Map<string, string>();

    for (let i = 0; i < teamScope.length; i++)
        teamInfo.set(teamScope[i], teamValue[i] ?? "");

    return teamInfo;
}


const makeTeamfromDoc = function (
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
): Team {
    const data: firebase.firestore.DocumentData = doc.data();

    return new Team(
        doc.id,
        data[COL_TEAMS.TEAMS_NAME],
        data[COL_TEAMS.TEAMS_INITIAL],
        data[COL_TEAMS.TEAMS_MANAGER],
        data[COL_TEAMS.TEAMS_REGION],
        data[COL_TEAMS.TEAMS_GENDER],
        data[COL_TEAMS.TEAMS_AGE],
        data[COL_TEAMS.TEAMS_LOGO]
    )
}


export const searchTeams = (search: string) =>
    Firebase.firestore
        .collection(COL_TEAMS.TEAMS_TEST4)
        .orderBy(COL_TEAMS.TEAMS_LOWERCASE)
        .startAt(search.toLowerCase())
        .endAt(search.toLowerCase() + '\uf8ff')
        .get().then((query: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) =>
            query.docs.map((value: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) =>
                makeTeamfromDoc(value)
            )
        )
