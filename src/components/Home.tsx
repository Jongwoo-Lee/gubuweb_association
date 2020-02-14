import React from "react";
import { useAssociationValue } from "../context/user";

export interface HomeProps {}

export const Home: React.SFC<HomeProps> = () => {
  const ascData = useAssociationValue();

  return ascData && ascData.isVerified ? <p>abc</p> : <NotVerified />;
};

const NotVerified = () => {
  return (
    <div>
      <p>
        아직 대회 관리 페이지 승인이 되지 않았습니다. 승인이 나면 대회 관리
        기능을 바로 사용하실수 있습니다.
      </p>
      <p>문의사항이 있으시면 contact@gubu.kr 로 이메일 보내주시 기 바랍니다.</p>
    </div>
  );
};
