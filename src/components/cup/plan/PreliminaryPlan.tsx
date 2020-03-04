import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
    Card,
    Typography,
    Button,
    IconButton,
    Grid,
    Collapse
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

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
        setting: {
            display: "flex",
            flexDirection: "row"
        },
        settingItems: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 250,
            height: 220,
            minWidth: 150,
            margin: "10px 10px"
        },
        subItems: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: 200,
            minWidth: 150,
            margin: "5px 5px"
        },
        title: {
            margin: "10px 10px" // top right bottom left
        },
        contents: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "0px 10px"
        }
    })
);
export interface PreliminaryProps { }

export const PreliminaryPlan: React.FC<PreliminaryProps> = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(true);
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
                    예선
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
