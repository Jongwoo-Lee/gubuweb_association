import React from "react";
import { Team } from "../../helpers/Firebase/team";
import { SquareButton } from "../common/SquareButton";
import TeamIcon from "../../images/team_off.svg";
import { Dialog, DialogTitle, Button } from "@material-ui/core";
import { TeamInfo } from "../common/TeamInfo";
import { usePushTeam, ContextSetTeams, useTeams } from "../../context/team/team";


export interface SquarePopDlgButtonProps {
    team: Team;
}


export const SquarePopDlgButton: React.FC<SquarePopDlgButtonProps> = ({
    team,
}: SquarePopDlgButtonProps) => {
    const [isInvite, setIsInvite] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (value: boolean) => {
        setOpen(false);
        setIsInvite(value);
    };
    const update: ContextSetTeams = usePushTeam();
    const preTeams: Team[] | null = useTeams();

    if (isInvite && update && preTeams) {
        update([...preTeams, team]);
        setIsInvite(false);
    }

    return (<div>
        <SquareButton
            title={team.name}
            imgSrc={team.logo ?? TeamIcon}
            clickEvent={handleClickOpen}
        />
        <TeamInfoDlg title={'팀 정보'} team={team} open={open} onClose={handleClose} />
    </div>
    );
};



export interface TeamInviteDlgProps {
    title: string;
    open: boolean;
    team: Team;
    onClose: Function;
}



const TeamInfoDlg: React.FC<TeamInviteDlgProps> = ({
    title,
    open,
    team,
    onClose,
}: TeamInviteDlgProps) => {
    const handleClose = () => {
        onClose(false);
    };

    const handleInvite = () => {
        onClose(true);
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="teaminfo-dialog-title" open={open}>
            <DialogTitle id="teaminfo-dialog-title">{title}</DialogTitle>
            <TeamInfo team={team} />
            <Button onClick={handleInvite}>초대</Button>
        </Dialog>
    );
}
