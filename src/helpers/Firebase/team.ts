import Firebase from ".";
import { COL_TEAMS } from "../../constants/firestore";




export class Team {
    teamName: string;
    teamInitial: string;
    manager: string;
    region: string | null;
    gender: string | null;
    age: string | null;

    constructor(
        teamName: string,
        teamInitial: string,
        manager: any,
        region: string | null | undefined,
        gender: string | null | undefined,
        age: string | null | undefined,
    ) {
        this.teamName = teamName;
        this.teamInitial = teamInitial;
        this.manager = manager;
        this.region = region ?? null;
        this.gender = gender ?? null;
        this.age = age ?? null;
    }
}

const makeTeamfromDoc = function (
    doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>,
): Team {
    const data: firebase.firestore.DocumentData = doc.data();
    return new Team(
        data[COL_TEAMS.TEAMS_NAME],
        data[COL_TEAMS.TEAMS_INITIAL],
        data[COL_TEAMS.TEAMS_MANAGER],
        data[COL_TEAMS.TEAMS_REGION],
        data[COL_TEAMS.TEAMS_GENDER],
        data[COL_TEAMS.TEAMS_AGE],
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
