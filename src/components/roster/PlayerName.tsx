import React from "react";
import { Typography } from "@material-ui/core";
import { Player } from "../../models";
import { CommonImage } from "../common/CommonImage";

export interface PlayerNameProps {
  player: Player;
}

export const PlayerName: React.FC<PlayerNameProps> = ({ player }) => {
  return (
    <div style={{ display: "flex", marginLeft: "10px", marginBottom: "10px" }}>
      <CommonImage src={player.image} type={2} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">{player.name}</Typography>
      </div>
      {/* <img
        src={player.image ?? PlayerIcon}
        alt={player.name + "logo" ?? "undefined team logo"}
        style={{ width: "75px", height: "75px", marginRight: "20px" }}
      /> */}
    </div>
  );
};
