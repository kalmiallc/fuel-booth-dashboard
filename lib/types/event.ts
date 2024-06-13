export enum ScoreType {
  RACING = 0,
  FINISHED = 1,
  DESTROYED = 2,
}
declare global {
  /**
   * Game Event
   */
  type GameEvent = {
    time: number;
    speed: number;
    score_type: ScoreType;
    damage: number;
    distance: number;
    user_hash: string;
    id: string;
  };
}
