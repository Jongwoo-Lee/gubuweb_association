import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { TitleGoback } from "../common/TitleGoBack";
import DateFnsUtils from "@date-io/date-fns";
import korLocale from "date-fns/locale/ko";
import { Typography, FormControl, Input, FormHelperText } from "@material-ui/core";
import { useWindowSize, useTextInput } from "../../hooks";
import { FORMTEXT } from "../../constants/texts";
import Firebase from "../../helpers/Firebase";
import { Team } from "../../helpers/Firebase/team";


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
        form: {
            width: "100%", // Fix IE 11 issue.
            marginTop: theme.spacing(1),
            margin: "0 20px"
        },
        formControl: {
            width: "100%",
            maxWidth: "500px",
            [theme.breakpoints.down("xs")]: {
                width: "75vw"
            }
        }
    });
});

export interface AddTeamProps { }

export const AddTeam: React.FC<AddTeamProps> = () => {
    const classes = useStyles();
    const { device } = useWindowSize();
    const { value: searchTeam, onChange: handleSearchTeam } = useTextInput();


    useEffect(() => {
        if (searchTeam.value.length > 0) {
            (async function test() {
                Firebase.fireSearchTeams(searchTeam.value).then((teams: Team[]) => {
                    teams.forEach((team: Team) => {
                        console.log(team.teamName)
                    })
                })
            })();
        }

        // return () => {
        //     cleanup
        // };
    }, [searchTeam.value])


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
            <Typography className={classes.title} variant="body1">
                {searchTeam.value}
            </Typography>
        </div>
    );
};
