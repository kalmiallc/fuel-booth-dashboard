export {};

declare global {
  /**
   * Game Event
   */
  type GameEvent = {
    time: number;
    speed: number;
    score_type: number;
    damage: number;
    distance: number;
    id: string;
  };
}
