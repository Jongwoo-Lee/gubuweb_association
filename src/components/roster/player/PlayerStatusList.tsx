import React from "react";
import { Typography, Chip } from "@material-ui/core";
import { SizedBox } from "../../common/SizedBox";
import { usePlayerContext } from "../../../context/team/team";
import { Player } from "../../../models";

export interface PlayerStatusListProps {}

export const PlayerStatusList: React.FC<PlayerStatusListProps> = () => {
  const { player, setPlayer } = usePlayerContext();

  const handleChange = (name: string) => (
    e: React.ChangeEvent | React.MouseEvent
  ) => {
    e.preventDefault();
    const temp = Player.fromPlayer(player);

    switch (name) {
      case "wait":
        temp.status.wait = !temp.status.wait;
        break;
      case "doc":
        temp.status.doc = !temp.status.doc;
        break;
      case "pro":
        temp.status.pro = !temp.status.pro;
        break;
      case "deny":
        temp.status.deny = !temp.status.deny;
        break;
      case "expire":
        temp.status.expire = !temp.status.expire;
        break;
      default:
        break;
    }
    setPlayer(temp);
  };
  return (
    <div>
      <Typography variant="h6">추가 상태</Typography>
      <SizedBox height="20px" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Chip
          style={
            player.status?.wait
              ? {
                  width: "60px",
                  backgroundColor: "#FC7A57",
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
          label="대기"
          onClick={handleChange("wait")}
        />
        <Chip
          style={
            player.status?.doc
              ? {
                  width: "60px",
                  backgroundColor: "#F3B63A",
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
          label="서류"
          onClick={handleChange("doc")}
        />
        <Chip
          style={
            player.status?.pro
              ? {
                  width: "60px",
                  backgroundColor: "#4834DF",
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
          label="선출"
          onClick={handleChange("pro")}
        />
        <Chip
          style={
            player.status?.deny
              ? {
                  width: "60px",
                  backgroundColor: "#B83227",
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
          label="불가"
          onClick={handleChange("deny")}
        />
        <Chip
          style={
            player.status?.expire
              ? {
                  width: "60px",
                  backgroundColor: "#2B2B52",
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
          label="만료"
          onClick={handleChange("expire")}
        />
      </div>
    </div>
  );
};
