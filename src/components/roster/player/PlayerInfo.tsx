import React from "react";
import { ROUTENAMES } from "../../../constants/routes";
import {
  useCurrentTeam,
  CurrentPlayerProvider,
  useCurrentPlayer
} from "../../../context/team/team";
import { useRouteMatch } from "react-router-dom";
import { WithTitle } from "../../common/WithTitle";
import { SmallTeamName } from "../TeamName";
import { PlayerName } from "./PlayerName";
import { Button } from "@material-ui/core";
import { AcceptPlayerSwitch } from "./AcceptPlayerSwitch";
import { PlayerStatusList } from "./PlayerStatusList";
import { SizedBox } from "../../common/SizedBox";
import { PlayerRemark } from "./PlayerRemark";
import { PlayerDocuments } from "./PlayerDocuments";

export const PlayerInfo: React.FC = () => {
  const match = useRouteMatch<{ playerUID: string }>();
  return (
    <CurrentPlayerProvider playerUID={match.params.playerUID}>
      <WithTitle title={ROUTENAMES.ROSTER}>
        <PlayerInfoComponent />
      </WithTitle>
    </CurrentPlayerProvider>
  );
};

const PlayerInfoComponent: React.FC = () => {
  const team = useCurrentTeam();
  const player = useCurrentPlayer();

  return (
    <div>
      <SmallTeamName team={team} />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <PlayerName player={player} />
        <div>
          <Button style={{ marginRight: "20px" }} variant="contained">
            저장
          </Button>
        </div>
      </div>
      <br />
      <AcceptPlayerSwitch player={player} />
      <SizedBox height="40px" />
      <PlayerRemark />
      <SizedBox height="40px" />
      <PlayerStatusList />
      <SizedBox height="40px" />
      <PlayerDocuments />
    </div>
  );
};
