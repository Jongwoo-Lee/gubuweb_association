import React from "react";
import { useAssociationValue } from "../context/user";
import { SquareButton } from "./common/SquareButton";
import { ROUTES } from "../constants/routes";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Trophy from "../images/trophy_on.svg";
import Team from "../images/team_off.svg";
import Setting from "../images/setting.svg";
import { Typography } from "@material-ui/core";

export interface HomeProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      marginTop: "40px",
      [theme.breakpoints.down("sm")]: {
        alignItems: "center"
      }
    },
    cards: {
      display: "flex",
      marginTop: "40px",
      flexWrap: "wrap"
    }
  })
);

export const Home: React.SFC<HomeProps> = () => {
  const ascData = useAssociationValue();
  const classes = useStyles();

  const Verified = () => {
    return (
      <div className={classes.root}>
        <Typography variant="h3">시작 페이지</Typography>
        <div className={classes.cards}>
          <SquareButton
            title="대회 관리"
            route={ROUTES.CONTEST}
            imgSrc={Trophy}
          />
          <SquareButton
            title="팀 / 선수 관리"
            route={ROUTES.ROSTER}
            imgSrc={Team}
          />
          <SquareButton
            title="연맹 정보 관리"
            route={ROUTES.ACCOUNT}
            imgSrc={Setting}
          />
        </div>
      </div>
    );
  };

  return ascData && ascData.isVerified ? <Verified /> : <NotVerified />;
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
