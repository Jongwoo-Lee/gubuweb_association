import React from "react";
import TeamIcon from "../../images/team_off.svg";
import PlayerIcon from "../../images/user.svg";
import TrophyIcon from "../../images/trophy_on.svg";

export interface CommonImageProps {
  src: string | undefined;
  type: number;
  width?: string;
  height?: string;
}

export const CommonImage: React.SFC<CommonImageProps> = ({
  src,
  type,
  width,
  height
}) => {
  const DefaultIcon = () => {
    switch (type) {
      case 0:
        return TrophyIcon;
      case 1:
        return TeamIcon;
      case 2:
        return PlayerIcon;
      default:
        return TrophyIcon;
    }
  };

  return (
    <img
      src={src !== undefined && src !== "-" ? src : DefaultIcon()}
      alt={src + "logo" ?? "undefined team logo"}
      style={{
        width: width ?? "75px",
        height: height ?? "75px",
        marginRight: "20px"
      }}
    />
  );
};
