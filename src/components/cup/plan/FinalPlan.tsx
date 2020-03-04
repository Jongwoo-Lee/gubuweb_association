import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
    Typography,
    IconButton,
    Grid,
    Collapse
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import {
    useFinalTeams,
} from "../../../context/cup/cupMatch";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
            margin: "50px 0px 0px 0px"
        },
        expand: {
            transform: "rotate(0deg)",
            marginLeft: "auto",
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest
            })
        },
        expandOpen: {
            transform: "rotate(180deg)"
        },
        line: {
            color: "black",
            backgroundColor: "black",
            borderColor: "black",
            height: 1,
            width: "100%"
        },
        final: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",

            border: "1px solid black"
        },
        finalBtn: {
            margin: "15px",
            border: "1px solid black"
        },
        dragTarget: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "15px"
        }
    })
);

export interface FinalProps { }

export const FinalPlan: React.FC<FinalProps> = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);
    const final = useFinalTeams();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                justify="space-between"
                alignItems="flex-start"
            >
                <Typography color="textPrimary" variant="h5">
                    본선
        </Typography>
                <IconButton
                    className={expanded ? classes.expandOpen : classes.expand}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </IconButton>
            </Grid>
            <br />
            <hr className={classes.line} />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            </Collapse>
        </div>
    );
};
