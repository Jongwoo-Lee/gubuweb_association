import React from "react";
import TitleGoback from "../common/TitleGoBack";

export interface AddContestProps {}

export const AddContest: React.SFC<AddContestProps> = () => {
  return (
    <div>
      <TitleGoback title="대회 추가" />
    </div>
  );
};
