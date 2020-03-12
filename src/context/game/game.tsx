export interface SubGameInfo {
  // [No: number]: string | null; // 4조(group) - 1 (No)
  team1: string | null;
  team1No?: number;
  team2: string | null;
  team2No?: number;
  location?: string;
  kickOffTime?: firebase.firestore.Timestamp;
  id: number;
  gid?: string;
  isFinal: boolean;
}
