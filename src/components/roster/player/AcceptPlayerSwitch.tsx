import React, { useState } from "react";
import { Switch, Typography, Chip } from "@material-ui/core";
import { SizedBox } from "../../common/SizedBox";
import { Player } from "../../../models";

export interface AcceptPlayerSwitchProps {
  player: Player;
}

export const AcceptPlayerSwitch: React.FC<AcceptPlayerSwitchProps> = ({
  player
}) => {
  const [approve, setAccept] = useState(player.approve);

  const handleChange = (e: React.ChangeEvent | React.MouseEvent) => {
    e.preventDefault();
    setAccept(!approve);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6">승인 상태</Typography>
        <SizedBox width="10px" />
        <Switch
          checked={approve}
          onChange={handleChange}
          value="accept"
          color="primary"
        />
      </div>
      <SizedBox height="20px" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Chip
          style={
            approve
              ? {
                  width: "60px",
                  backgroundColor: "#488CFF",
                  color: "#fff",
                  margin: "0 10px"
                }
              : {
                  width: "60px",
                  backgroundColor: "#ddd",
                  color: "#f8f8f8",
                  margin: "0 10px"
                }
          }
          label="승인"
          onClick={handleChange}
        />
        {approve && (
          <>
            <SizedBox width="20px" />
            <Typography variant="body2">승인 날짜: </Typography>
            <SizedBox width="10px" />
            <Typography variant="body1">
              {Intl.DateTimeFormat("ko-KR").format(
                player.approveDate ?? Date.now()
              )}
            </Typography>
          </>
        )}
      </div>
    </>
  );
};
