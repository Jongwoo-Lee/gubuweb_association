enum PlayerStatus {
  approved
}
export class Player {
  uid: string;
  name: string;
  backnumber: number | undefined;
  image: string | undefined;
  status: number | undefined;
  remark: string | undefined;
  approveDate: Date | undefined;
  approveExpire: Date | undefined;

  constructor(
    uid: string,
    name: string,
    info: {
      backnumber?: number;
      image?: string;
      status?: number;
      remark?: string;
      approveDate?: Date;
      approveExpire?: Date;
    }
  ) {
    this.uid = uid;
    this.name = name ?? "알수없음";
    this.backnumber = info.backnumber;
    this.image = info.image;
    this.status = info.status;
    this.approveDate = info.approveDate;
    this.approveExpire = info.approveExpire;
  }

  static fromPlayer(player: Player) {
    return new Player(player.uid, player.name, {
      backnumber: player.backnumber,
      image: player.image,
      status: player.status,
      remark: player.remark,
      approveDate: player.approveDate,
      approveExpire: player.approveExpire
    });
  }

  // static fromDoc(value: Object) {
  //   return new Player(value.[COL_ASC.TEAM_PLAYER_UID], value.[COL_ASC.TEAM_PLAYER_NAME], {
  //     backnumber: player.backnumber,
  //     image: player.image
  //   });
  // }
}
