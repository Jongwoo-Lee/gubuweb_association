import React, { useState } from "react";
import { ROUTENAMES } from "../../../constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import { TitleGoBack } from "../../common/TitleGoBack";
import {
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  TableBody,
  Button,
  Grid
} from "@material-ui/core";
import { Team } from "../../../models";
import { saveTeams, CupInfo } from "../../../helpers/Firebase/cup";
import { useAscTeams } from "../../../context/team/team";

export interface WrapCupDetailTeamProps {
  cupInfo: CupInfo;
  cupID: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    width: "80%",
    margin: "50px 0px 0px 0px"
  },
  table: {
    width: "80%"
  },
  cards: {
    display: "flex",
    marginTop: "40px",
    flexWrap: "wrap"
  },
  tableHeader: {
    minWidth: 170
  }
});

interface Column {
  id: "name" | "manager" | "age" | "region" | "gender" | "add";
  label: string;
}

const columns: Column[] = [
  { id: "name", label: "팀 이름" },
  { id: "manager", label: "매니저" },
  { id: "age", label: "연령대" },
  { id: "region", label: "지역" },
  { id: "gender", label: "성별" }
  // { id: 'add', label: '추가'},
];

export const WrapCupDetailTeam: React.FC<WrapCupDetailTeamProps> = ({
  cupInfo,
  cupID
}: WrapCupDetailTeamProps) => {
  const classes = useStyles();
  const teams = useAscTeams();
  //  const teams: Team[] = []; // 연맹에 가입된 팀 목록을 불러오면 될 듯 함
  const [selectedUID, setselectedUID] = useState<Array<string>>(
    Array<string>()
  );

  for (let i = 0; i < 100; i++) {
    const managerObj: Object = { a: "b" };
    teams.push(
      new Team(`uid${i}`, `tempTeam + ${i}`, "tsx", managerObj, {
        region: `${i}`,
        gender: `${i}`,
        age: [`${i}`],
        logo: `${i}`
      })
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (
    event: React.MouseEvent<unknown>,
    teamUID: string,
    isItemSelected: boolean
  ) => {
    let selectedTeam: string[] = Array<string>();
    if (isItemSelected) {
      selectedTeam = [...selectedUID];
      const idx = selectedTeam.indexOf(teamUID);
      if (idx > -1) selectedTeam.splice(idx, 1);
    } else {
      selectedTeam = [...selectedUID, teamUID];
    }

    setselectedUID(selectedTeam);
  };

  const handleSave = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();

    await saveTeams(cupID, selectedUID);
    // current cup uid에 SELECTED TEAM를 보낸다.
  };

  return (
    <div className={classes.root}>
      <TitleGoBack title={cupInfo?.name ?? "No data"} />
      <Grid
        className={classes.title}
        container
        spacing={3}
        justify="space-between"
        alignItems="flex-start"
      >
        <Typography color="textPrimary" variant="h4">
          {ROUTENAMES.CUP_DETAIL_TEAM}
        </Typography>
        <Button variant="contained" onClick={handleSave}>
          저장
        </Button>
      </Grid>

      <TableContainer className={classes.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align="center"
                  className={classes.tableHeader}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teams
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(team => {
                const isItemSelected: boolean = selectedUID.includes(team.uid);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={team.uid}
                    onClick={event =>
                      handleRowClick(event, team.uid, isItemSelected)
                    }
                    selected={isItemSelected}
                  >
                    {columns.map(column => {
                      const value: string | string[] = team.parseValue(
                        column.id
                      );
                      return (
                        <TableCell key={column.id} align={"center"}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.table}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={teams.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};
