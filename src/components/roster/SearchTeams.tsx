import * as React from "react";
import { Snackbar } from "@material-ui/core";
import { Team } from "../../helpers/Firebase/team";
import { SquarePopDlgButton } from "./SquarePopDlgButton";
import { useSendBoolean } from "../../context/common/commonContext";

export interface SearchTeamsProps {
  teams: Team[];
}

export const SearchTeams: React.SFC<SearchTeamsProps> = ({ teams }) => {
  const { isTrue, setTrue } = useSendBoolean();

  const handleSnackBarClose = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setTrue(false);
  };
  return (
    <div style={{ display: "flex", marginTop: "40px", flexWrap: "wrap" }}>
      {teams.length > 0 &&
        teams.map((team: Team, index: number) => (
          <SquarePopDlgButton key={index} team={team} />
        ))}
      <Snackbar
        open={isTrue}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message="초대를 성공적으로 보냈습니다."
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      />
    </div>
  );
};
