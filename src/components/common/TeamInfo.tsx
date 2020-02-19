import { Team, getTeamInfo } from "../../helpers/Firebase/team";
import { Card, makeStyles, CardContent, Table, TableRow, TableCell, TableBody } from "@material-ui/core";
import React from "react";
import TeamIcon from "../../images/team_off.svg";



const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: 400,
        minWidth: 400,
        margin: "20px 20px",
        overflow: "auto"

    },
    logo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    table: {
        minWidth: 300,
    },
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface TeamInfoProps {
    team: Team;
}


export const TeamInfo: React.FC<TeamInfoProps> = ({
    team,
}: TeamInfoProps) => {
    const classes = useStyles();
    const teamInfo: Map<string, string> = getTeamInfo(team);

    const tableComponent: JSX.Element[] = new Array<JSX.Element>();
    teamInfo.forEach((value: string, key: string, _: Map<string, string>) => {
        tableComponent.push(
            <TableRow key={key} >
                <TableCell>{key}</TableCell>
                <TableCell align="center">{value}</TableCell>
            </TableRow>
        )
    });

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.logo}>
                {team.logo !== undefined && (
                    <img
                        src={team.logo ?? TeamIcon}
                        style={{ width: "100px", height: "100px" }}
                    />
                )}
            </CardContent>
            <CardContent>
                <Table className={classes.table}>
                    <TableBody>
                        {(tableComponent.length > 0) && tableComponent.map((e: JSX.Element) => e)}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};