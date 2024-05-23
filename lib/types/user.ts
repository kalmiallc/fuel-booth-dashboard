export {};

declare global {
  /**
   * User
   */
  interface UserInterface extends BaseInterface {
    damage: string | null;
    distance: string | null;
    email: string;
    high_score: number;
    player_contract_index_id: number;
    register_transaction_id: string | null;
    score_type: string | null;
    speed: string | null;
    time_seconds: string | null;
    username: string;
    username_email_hash: string;
    username_hash: string;
  }

  interface UserResponse extends GeneralResponse<UserInterface> {}

  /**
   *  Register
   */
  interface RegisterInterface extends UserInterface {
    token: string;
    captchaJwt?: string;
  }
  interface ValidateMailInterface {
    data: {
      result: boolean;
    };
    status: number;
    success: boolean;
  }

  interface RegisterResponse extends GeneralResponse<RegisterInterface> {}
  interface ValidateMailResponse extends GeneralResponse<ValidateMailInterface> {}
  interface PasswordResetResponse extends GeneralResponse<boolean> {}

  /**
   * Login
   */
  interface LoginInterface extends UserInterface {
    token: string;
    captchaJwt?: string;
  }

  interface LoginResponse extends GeneralResponse<LoginInterface> {}
  interface PasswordResetRequestResponse extends GeneralResponse<boolean> {}
  interface OAuthSessionInterface {
    sessionToken: string;
  }
  interface OauthSessionResponse extends GeneralResponse<OAuthSessionInterface> {}

  /**
   * Wallet
   */
  interface WalletMsgInterface {
    message: string;
    timestamp: number;
  }
  interface WalletLoginInterface extends UserInterface {
    authToken: string;
  }
  interface WalletMsgResponse extends GeneralResponse<WalletMsgInterface> {}
  interface WalletLoginResponse extends GeneralResponse<WalletLoginInterface> {}

  type AuthInterface = LoginInterface | UserInterface | WalletLoginInterface;

  /** Captcha login */
  type CaptchaData = { ts: string; jwt: string };
}
