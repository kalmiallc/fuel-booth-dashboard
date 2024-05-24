export {};

declare global {
  /**
   * Player
   */
  interface PlayerInterface {
    highScore: string;
    playerId: number;
    username: string;
    username_and_email_hash: string;
    username_hash: string;
  }

  interface PlayerResponse extends GeneralResponse<PlayerInterface> {}
  interface PlayersResponse {
    data: {
      decoded_users: Array<PlayerInterface>;
    };
    id: string;
    status: number;
  }
}
