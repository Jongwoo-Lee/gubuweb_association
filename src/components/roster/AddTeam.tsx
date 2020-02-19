import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoback } from "../common/TitleGoBack";
import { Typography, FormControl, Input, FormHelperText, SvgIconProps } from "@material-ui/core";
import { useTextInput } from "../../hooks";
import { FORMTEXT } from "../../constants/texts";
import TeamIcon from "../../images/team_off.svg";
import { Team } from "../../helpers/Firebase/team";
import { useSearchTeam } from "../../hooks/team";
import { SquarePopDlgButton } from "../common/SquareButton";
import { TeamInfo } from "../common/TeamInfo";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column"
        },
        title: {
            marginTop: "20px",
            marginBottom: "5px"
        },
        formControl: {
            width: "100%",
            maxWidth: "500px",
            [theme.breakpoints.down("xs")]: {
                width: "75vw"
            }
        },
        cards: {
            display: "flex",
            marginTop: "40px",
            flexWrap: "wrap"
        }
    });
});

export interface AddTeamProps { }

export const AddTeam: React.FC<AddTeamProps> = () => {
    const classes = useStyles();
    // const { device } = useWindowSize();
    const { value: searchTeam, onChange: handleSearchTeam } = useTextInput();
    const teams: Team[] = useSearchTeam(searchTeam.value);



    return (
        <div className={classes.root}>
            <TitleGoback title="팀 추가" />
            <br />
            <Typography className={classes.title} variant="body1">
                {FORMTEXT.ADD_TEAM_PLHD}
            </Typography>
            <FormControl
                className={classes.formControl}
                error={
                    searchTeam.error !== undefined && searchTeam.error.length > 0
                }
            >
                <Input
                    name="name"
                    type="text"
                    id="name"
                    value={searchTeam.value}
                    onChange={handleSearchTeam}
                    autoFocus
                    autoComplete="current-team"
                    aria-describedby="component-add-team-text"
                />
                <FormHelperText id="component-add-team-text">
                    {searchTeam.error !== undefined &&
                        searchTeam.error.length > 0 &&
                        searchTeam.error}
                </FormHelperText>
            </FormControl>
            <div className={classes.cards}>
                {(teams.length > 0) &&
                    teams.map((team: Team) =>
                        <SquarePopDlgButton
                            key={team.name}
                            item={<TeamInfo team={team} />}
                            title={team.name}
                            imgSrc={team.logo ?? TeamIcon}
                        />
                    )
                }</div>
        </div>
    );
};
