import * as React from "react";
import { Team } from "../../helpers/Firebase/team";
import { SquarePopDlgButton } from "./SquarePopDlgButton";

export interface SearchTeamsProps {
  teams: Team[];
}

export const SearchTeams: React.SFC<SearchTeamsProps> = ({ teams }) => {
  return (
    <div style={{ display: "flex", marginTop: "40px", flexWrap: "wrap" }}>
      {teams.length > 0 &&
        teams.map((team: Team, index: number) => (
          <SquarePopDlgButton key={index} team={team} />
        ))}
    </div>
  );
};
