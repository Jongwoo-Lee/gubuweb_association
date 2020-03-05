import React from "react";
import { withStyles } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

export const CustomExPanel = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    border: "none",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);
export const CustomExPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .02)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary);

export const CustomExPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1
  }
}))(MuiExpansionPanelDetails);
