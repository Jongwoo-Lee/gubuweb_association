import { useEffect, useState } from "react";
import { Team } from "../helpers/Firebase/team";
import Firebase from "../helpers/Firebase";


export const useSearchTeam = (search: string) => {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        if (search.length > 0) {
            (async function test() {
                Firebase
                    .fireSearchTeams(search)
                    .then((teams: Team[]) => setTeams(teams))
            })();
        }
    }, [search]);

    return teams;
};