/**
 * System Error codes - 500000.
 */
export enum SystemErrorCode {
  DEFAULT_SYSTEM_ERROR = 500000,
  UNHANDLED_SYSTEM_ERROR = 500001,
  SQL_SYSTEM_ERROR = 500002,
  AWS_SYSTEM_ERROR = 500003,
  MICROSERVICE_SYSTEM_ERROR = 500004,
}

declare global {
  interface EntityErrorMessageInterface {
    message: string;
    property: string;
    statusCode: number;
  }

  interface ApiError {
    errors?: Array<EntityErrorMessageInterface>;
    code?: number;
    status?: number;
    message?: string;
    path?: string;
    timestamp?: string;
  }
}
