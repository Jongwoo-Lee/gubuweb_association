import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { SizedBox } from "../../common/SizedBox";
import { usePlayerContext } from "../../../context/team/team";
import { Player } from "../../../models";

export interface PlayerRemarkProps {}

export const PlayerRemark: React.FC<PlayerRemarkProps> = () => {
  const { player, setPlayer } = usePlayerContext();

  const handleRemarkChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    const temp = Player.fromPlayer(player);
    temp.remark = event.target.value;
    setPlayer(temp);
    //setValue({ ...value, value: event.target.value, error: "" });
  };

  return (
    <div>
      <Typography variant="h6">비고</Typography>
      <SizedBox height="20px" />
      <TextField
        fullWidth
        variant="outlined"
        name="player-remark"
        type="text"
        id="player-remark"
        multiline
        rows="6"
        value={player.remark}
        onChange={handleRemarkChange}
        aria-describedby="component-player-remark-text"
      />
    </div>
  );
};
