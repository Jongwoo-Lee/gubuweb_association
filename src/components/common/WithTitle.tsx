import React from "react";
import { TitleGoBack } from "./TitleGoBack";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

export interface WithTitleProps {
  title: string;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    child: {
      marginTop: "20px",
      marginLeft: "20px",
      marginBottom: "50px",
      width: "55vw",
      [theme.breakpoints.down("sm")]: {
        width: "70vw"
      },
      [theme.breakpoints.down("xs")]: {
        width: "90vw"
      },
      minWidth: "400px"
    }
  })
);

export const WithTitle: React.FC<WithTitleProps> = ({ title, children }) => {
  const classes = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TitleGoBack title={title} />
      <div className={classes.child}>{children}</div>
    </div>
  );
};
