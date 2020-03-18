import { PlayerStatus as PL } from "./player";
import { TeamManager as TM } from "./team";

export type PlayerStatus = PL;
export type TeamManager = TM;

export { Player } from "./player";
export { Team, getTeamInfo } from "./team";
export { Association } from "./association";
export { CupInfo } from "./cup";

// export interface PlayerStatus;
// export {
//   Player,

//   Team,
//   getTeamInfo,
//   TeamManager,
//   Association,
//   CupInfo
// };
// export * from "./team";
// export * from "./association";
// export * from "./cup";
