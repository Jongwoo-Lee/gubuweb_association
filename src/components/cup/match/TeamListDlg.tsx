import React from "react";
import {
  Dialog,
  DialogTitle,
  makeStyles,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    minWidth: 400,
    margin: "20px 20px",
    overflow: "auto"
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  table: {
    minWidth: 300
  }
});

export interface TeamListDlgProps {
  title: string;
  open: boolean;
  onClose: Function;
  teams: string[];
  team: string | null;
}

export const TeamListDlg: React.FC<TeamListDlgProps> = ({
  title,
  open,
  onClose,
  teams,
  team
}: TeamListDlgProps) => {
  const classes = useStyles();
  const handleClose = () => {
    onClose(null);
  };
  const handleRowClick = (team: string) => {
    onClose(team);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="teaminfo-dialog-title"
      open={open}
    >
      <DialogTitle id="teaminfo-dialog-title">{title}</DialogTitle>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          {
            teams.length > 0 ?
              <Table className={classes.table}>
                <TableBody>
                  {teams.map((team: string, index: number) => (
                    <TableRow key={index} onClick={_ => handleRowClick(team)}>
                      <TableCell align="center">{team}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> : <Typography align="center" variant="body1" component="span"> 추가 가능한 팀이 없습니다</Typography>}
        </CardContent>
      </Card>
    </Dialog>
  );
};
