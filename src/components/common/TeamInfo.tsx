import { Team } from "../../helpers/Firebase/team";
import { Card, makeStyles, CardContent } from "@material-ui/core";
import React from "react";
import TeamIcon from "../../images/team_off.svg";



const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 200,
        minWidth: 150,
        margin: "20px 20px"
    },
    logo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    detail: {
        display: "flex",
        flexDirection: "row",
    },
    subTitle: {
        position: "absolute",
        left: "30px" // 20 px + 10px
    },
    subContent: {
        position: "absolute",
        left: "130px"
    }
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface TeamInfoProps {
    team: Team;
}


export const TeamInfo: React.FC<TeamInfoProps> = ({
    team,
}: TeamInfoProps) => {
    const classes = useStyles();

    console.log(`team - ${team.name}`);
    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.logo}>
                {team.logo !== undefined && (
                    <img
                        src={team.logo ?? TeamIcon}
                        style={{ width: "150px", height: "150px" }}
                    />
                )}
            </CardContent>
            {/* <CardContent>{team.manager}</CardContent> */}

            <CardContent className={classes.detail}>
                <div className={classes.subTitle}>
                    팀 이름
                </div>
                <div className={classes.subContent}>
                    {team.name}
                </div>
            </CardContent>
            <CardContent className={classes.detail}>
                <div className={classes.subTitle}>
                    활동 지역
                </div>
                <div className={classes.subContent}>
                    {team.region}
                </div></CardContent>
            <CardContent className={classes.detail}>
                <div className={classes.subTitle}>
                    팀 연령
                </div>
                <div className={classes.subContent}>
                    {team.age}
                </div></CardContent>
            <CardContent className={classes.detail}>
                <div className={classes.subTitle}>
                    팀 성별
                </div>
                <div className={classes.subContent}>
                    {team.gender}
                </div></CardContent>
        </Card>
    );
};