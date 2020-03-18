export type PlayerStatus = {
  wait: boolean;
  doc: boolean;
  pro: boolean;
  deny: boolean;
  expire: boolean;
};

export class Player {
  uid: string;
  name: string;
  backnumber: number | undefined;
  image: string | undefined;
  status: PlayerStatus;
  remark: string | undefined;
  approve: boolean;
  approveDate: Date | undefined;
  approveExpire: Date | undefined;

  constructor(
    uid: string,
    name: string,
    info: {
      backnumber?: number;
      image?: string;
      status?: PlayerStatus;
      remark?: string;
      approve?: boolean;
      approveDate?: Date;
      approveExpire?: Date;
    }
  ) {
    this.uid = uid;
    this.name = name ?? "알수없음";
    this.backnumber = info.backnumber;
    this.image = info.image;
    this.status = info.status
      ? { ...info.status }
      : {
          wait: false,
          doc: false,
          pro: false,
          deny: false,
          expire: false
        };
    this.approve = info.approve ?? false;
    this.approveDate = info.approveDate;
    this.approveExpire = info.approveExpire;
  }

  static empty = () => {
    return new Player("", "", {});
  };

  static fromPlayer = (player: Player) => {
    return new Player(player.uid, player.name, {
      backnumber: player.backnumber,
      image: player.image,
      status: { ...player.status },
      remark: player.remark,
      approve: player.approve,
      approveDate: player.approveDate,
      approveExpire: player.approveExpire
    });
  };

  // static fromDoc(value: Object) {
  //   return new Player(value.[COL_ASC.TEAM_PLAYER_UID], value.[COL_ASC.TEAM_PLAYER_NAME], {
  //     backnumber: player.backnumber,
  //     image: player.image
  //   });
  // }
}
