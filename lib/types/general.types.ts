import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider';

export interface ConfigInterface {
  APP_URL: string;
  GAME_URL: string;
  API_BASE: string;
}

declare global {
  /**
   * Window
   */
  interface Window {
    $message: MessageApiInjection;
    $i18n: any;
  }

  /**
   * General Interfaces
   */
  interface BaseInterface {
    id: number;
    status: number;
    createTime: string;
    updateTime: string;
  }

  /**
   * Base responses
   */
  type GeneralResponse<T> = {
    data: T;
    id: string;
    status: number;
  };
  type GeneralItemsResponse<T> = {
    data: {
      items: Array<T>;
      total: number;
    };
    id: string;
    status: number;
  };
}
