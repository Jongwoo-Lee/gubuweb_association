import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoback } from "../common/TitleGoBack";

export interface CupDetailPlanProps { }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column"
        },
        cards: {
            display: "flex",
            marginTop: "40px",
            flexWrap: "wrap"
        }
    })
);

export const CupDetailPlan: React.SFC<CupDetailPlanProps> = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TitleGoback title={ROUTENAMES.CUP_DETAIL_PLAN} />
            <div className={classes.cards}>
                {ROUTENAMES.CUP_DETAIL_PLAN}
            </div>
        </div>
    );
};
