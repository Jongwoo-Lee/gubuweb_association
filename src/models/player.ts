export class Player {
  uid: string;
  name: string;
  backnumber: number | undefined;
  image: string | undefined;

  constructor(
    uid: string,
    name: string,
    info: {
      backnumber?: number;
      image?: string;
    }
  ) {
    this.uid = uid;
    this.name = name ?? "알수없음";
    this.backnumber = info.backnumber;
    this.image = info.image;
  }

  static fromPlayer(player: Player) {
    return new Player(player.uid, player.name, {
      backnumber: player.backnumber,
      image: player.image
    });
  }

  // static fromDoc(value: Object) {
  //   return new Player(value.[COL_ASC.TEAM_PLAYER_UID], value.[COL_ASC.TEAM_PLAYER_NAME], {
  //     backnumber: player.backnumber,
  //     image: player.image
  //   });
  // }
}
