/**
 * Get assorted error messages: messages for fields (validation) and general errors
 */
export function apiError(
  err: {
    data: {
      code?: number;
      message?: string;
      path?: string[];
      errors?: { code: number; message: string; path: string[] }[];
    };
  },
  getMessage = true,
  defaultMessage = ''
): { errors: (string | number)[]; fields: { [k: string]: string | number } } {
  if (err?.data?.code) {
    return {
      errors: [getMessage ? getErrorMsg(err.data.code, defaultMessage) : err.data.code],
      fields: {},
    };
  }

  const codeInMessage = +(err?.data?.message?.split(':')[0] || '');

  if (codeInMessage) {
    return {
      errors: [getMessage ? getErrorMsg(codeInMessage, defaultMessage) : codeInMessage],
      fields: {},
    };
  }

  if (!err?.data?.errors || !Array.isArray(err.data.errors) || !err.data.errors.length) {
    return { errors: [getMessage ? getErrorMsg(undefined, defaultMessage) : 500001], fields: {} };
  }

  const res = {
    errors: [] as (string | number)[],
    fields: {} as { [k: string]: string | number },
  };

  err.data.errors.forEach(e => {
    if (e.path && e.path.length && typeof e.path[0] === 'string') {
      res.fields[e.path[0]] = getMessage ? getErrorMsg(e.code, defaultMessage) : e.code;
    } else {
      res.errors.push(getMessage ? getErrorMsg(e.code, defaultMessage) : e.code);
    }
  });

  return res;
}

export function getErrorMsg(code = 500001, defaultMessage = '') {
  if (code === 500001 && defaultMessage) {
    return defaultMessage;
  }

  if (!(code in ErrorCodes)) {
    return defaultMessage || ErrorCodes[500001];
  }

  return ErrorCodes[code];
}

export const ErrorCodes = {
  // SystemErrorCode
  500000: 'DEFAULT_SYSTEM_ERROR',
  500001: 'There was an error with your request. Please try again later.',
  500002: 'SQL_SYSTEM_ERROR',
  500003: 'VECTOR_DB_SYSTEM_ERROR',
  500004: 'EMAIL_SYSTEM_ERROR',

  // ValidatorErrorCode
  422000001: 'VALIDATION_DTO_NOT_DEFINED',
  422000002: 'VALIDATION_PARAM_NOT_DEFINED',
  422000003: 'VALIDATION_PARAM_INVALID',
  4220000: 'DEFAULT_VALIDATION_ERROR',
  4220001: 'ID_NOT_PRESENT_ERROR',
  4220002: 'BAD_QUERY_DATE_RANGE',
  4221001: 'USERNAME_NOT_PRESENT',
  42221100: 'SIGN_UP_EMAIL_NOT_VALID',
  42221101: 'SIGN_UP_EMAIL_ALREADY_TAKEN',
  42221102: 'SIGN_UP_EMAIL_NOT_PRESENT',
  4222029: 'Email is already taken',

  100_422010: 'Username is already taken',
} as { [k: number]: string };
/**
 * Error messages
 */
export function userFriendlyMsg(error: ApiError | ReferenceError | TypeError | DOMException | any) {
  // Check error exists and if translation is included
  if (!window.$i18n || !(window.$i18n instanceof Object) || !error) {
    if (error instanceof ReferenceError || error instanceof TypeError) {
      return error.message;
    }
    return 'Internal server error';
  }

  // Check error type
  if (instanceOfApiError(error)) {
    // Beautify API error
    const err = error as ApiError;
    if (err.errors && Array.isArray(err.errors)) {
      const errorMessages = err.errors.map(e =>
        singleErrorMessage(window.$i18n, e.message, e.statusCode)
      );
      return [...new Set(errorMessages)].join('\n');
    } else if (err.message) {
      return singleErrorMessage(window.$i18n, err.message, err.code || err.status);
    }
  } else if (error instanceof ReferenceError || error instanceof TypeError) {
    return window.$i18n.te(`error.${error.message}`)
      ? window.$i18n.t(`error.${error.message}`)
      : error.message;
  }

  return window.$i18n.t('error.API');
}

/** Translate single error message */
function singleErrorMessage($i18n: i18nType, message: string, statusCode: number = 0) {
  const code = takeFirstDigitsFromNumber(statusCode);
  if ($i18n.te(`error.${message}`)) {
    return $i18n.t(`error.${message}`);
  } else if ($i18n.te(`error.${statusCode}`)) {
    return $i18n.t(`error.${statusCode}`);
  } else if (code >= 500) {
    return $i18n.t('error.DEFAULT_SYSTEM_ERROR');
  } else if (code >= 400) {
    return $i18n.t('error.BAD_REQUEST');
  }
  return $i18n.t('error.API');
}

/** Check if object is instance of ApiError  */
function instanceOfApiError(object: any): object is ApiError {
  return ('code' in object || 'status' in object) && ('errors' in object || 'message' in object);
}

/** statusCode to HTTP code */
function takeFirstDigitsFromNumber(num: number, numOfDigits: number = 3): number {
  return parseInt(String(num).slice(0, numOfDigits));
}
