import { useEffect, useState } from "react";
import { Team } from "../helpers/Firebase/team";
import { ascTeamListColRef } from "../helpers/Firebase/asc";
import Firebase, { FirebaseAsc } from "../helpers/Firebase";

export const useSearchTeam = (search: string) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    if (search.length > 0) {
      (async function test() {
        Firebase.fireSearchTeams(search).then((teams: Team[]) =>
          setTeams(teams)
        );
      })();
    }
  }, [search]);

  return teams;
};

export const useLoadTeam = (ascData: FirebaseAsc) => {
  const [teams, setTeams] = useState<Team[]>(Array<Team>());

  // firebase 어딘가에서 불러와야 함, 거기엔 참가 확정 팀, 보류중인 팀 2종류가 존재 할 것 같음.
  useEffect(() => {
    const listener =
      ascData !== null
        ? ascTeamListColRef(ascData.uid).onSnapshot(querySnapshot => {
            let snapshotTeams: Team[] = [];
            querySnapshot.forEach(teamDoc => {
              if (teamDoc.exists) snapshotTeams.push(teamDoc.data());
            });
            if (snapshotTeams !== undefined && snapshotTeams !== []) {
              setTeams(snapshotTeams);
            }
          })
        : () => {};

    return () => {
      listener();
    };
  });

  return { teams, setTeams };
};
