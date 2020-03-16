import * as React from "react";
import { SquarePopDlgButton } from "./SquarePopDlgButton";
import { SendBooleanProvider } from "../../context/common";
import { FORMTEXT } from "../../constants/texts";
import { CommonSnackbar } from "../common/CommonSnackbar";
import { Team } from "../../models";
export interface SearchTeamsProps {
  teams: Team[];
}

export const SearchTeams: React.SFC<SearchTeamsProps> = ({ teams }) => {
  return (
    <SendBooleanProvider>
      <div style={{ display: "flex", marginTop: "40px", flexWrap: "wrap" }}>
        {teams.length > 0 &&
          teams.map((team: Team, index: number) => (
            <SquarePopDlgButton key={index} team={team} />
          ))}
      </div>
      <CommonSnackbar message={FORMTEXT.INVITE_SUCCESS} />
    </SendBooleanProvider>
  );
};
