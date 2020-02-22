import React, { MouseEventHandler, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardActionArea, Dialog, DialogTitle, Button } from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Team } from "../../helpers/Firebase/team";

const useStyles = makeStyles({

    root: {
        display: "flex",
        flexDirection: "row"
    },
    card: {
        width: "100%",
        minWidth: 150,
        margin: "20px 20px"
    },
});

// imgSrc 나 ImgIcon 둘중 하나만 꼭 넣어야 함
export interface GroupCardProps {
}


export const GroupCard: React.FC<GroupCardProps> = ({
}: GroupCardProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.card} variant="outlined">

                <Typography align="center" variant="body1" component="span">
                    A조
        </Typography>
            </Card>
            <Typography align="center" variant="body1" component="span">
                이거 뭐더라
        </Typography>
        </div>
    );
};