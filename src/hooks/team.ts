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


export const useLoadTeam = () => {
    const [teams, setTeams] = useState<Team[]>([]);

    // firebase 어딘가에서 불러와야 함, 거기엔 참가 확정 팀, 보류중인 팀 2종류가 존재 할 것 같음.

    return teams;
};