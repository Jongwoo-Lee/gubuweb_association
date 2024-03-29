import React from "react";
import { useCurrentTeam } from "../../context/team/team";
import { Theme, makeStyles, createStyles, Paper } from "@material-ui/core";
import { TeamName } from "./TeamName";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { PlayerTable } from "./player/PlayerTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      // component="div"
      // role="tabpanel"
      hidden={value !== index}
      id={`rosterteam-tabpanel-${index}`}
      aria-labelledby={`rosterteam-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `rosterteam-tab-${index}`,
    "aria-controls": `rosterteam-tabpanel-${index}`
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tab: {
      width: "320px",
      [theme.breakpoints.down("xs")]: {
        width: "160px"
      }
    }
  })
);

export interface RosterTeamPageProps {}

export const RosterTeamPage: React.FC<RosterTeamPageProps> = () => {
  const classes = useStyles();
  const team = useCurrentTeam();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <TeamName team={team} />
      <Paper square className={classes.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="rosterteam tabs"
        >
          <Tab label="선수 관리" {...a11yProps(0)} />
          <Tab label="참가 대회" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <PlayerTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </div>
  );
};
