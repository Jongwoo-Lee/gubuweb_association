import React from "react";
import { ROUTENAMES } from "../../constants/routes";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TitleGoBack } from "../common/TitleGoBack";
import { Typography, TableContainer, Table, TableRow, TableHead, TableCell, TablePagination, TableBody } from "@material-ui/core";
import { Team } from "../../helpers/Firebase/team";

export interface CupDetailTeamProps { }

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
    },
    container: {
    },

  })
);

interface Column {
  id: 'name' | 'manager' | 'age' | 'region' | 'gender' | 'add';
  label: string;
  minWidth?: number;
}


const columns: Column[] = [
  { id: 'name', label: '팀 이름', minWidth: 170 },
  { id: 'manager', label: '매니저', minWidth: 170 },
  { id: 'age', label: '연령대', minWidth: 170 },
  { id: 'region', label: '지역', minWidth: 170 },
  { id: 'gender', label: '성별', minWidth: 170 },
  { id: 'add', label: '추가', minWidth: 170 },
];



export const CupDetailTeam: React.SFC<CupDetailTeamProps> = () => {
  const classes = useStyles();
  const teams: Team[] = []; // 연맹에 가입된 팀 목록을 불러오면 될 듯 함 
  for (let i = 0; i < 100; i++) {
    const managerObj: Object = { 'a': 'b' };
    teams.push(new Team(`${i}`, `tempTeam + ${i}`, 'tsx', managerObj, `${i}`, `${i}`, `${i}`, `${i}`));
  }



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <TitleGoBack title='대회 이름' />
      <br></br>
      <Typography color="textPrimary" variant="h4">
        {ROUTENAMES.CUP_DETAIL_TEAM}
      </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(team => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={team.uid}>
                  {columns.map(column => {
                    const value: string | Object = team.parseValue(column.id);
                    return (
                      <TableCell key={column.id} align={'center'}>
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
