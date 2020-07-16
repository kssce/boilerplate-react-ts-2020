// import { nanoid } from 'nanoid';
import {
  ACCESS_TOKEN_KEY,
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY_FOR_HEADER,
} from '../constants/serverFields';
import { AuthToken } from '../../models/Networks';
import { EMPTY_STR } from '../constants/common';

function getToken(key: typeof ACCESS_TOKEN_KEY | typeof REFRESH_TOKEN_KEY) {
  const serializedToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (serializedToken) {
    const token: AuthToken = JSON.parse(serializedToken);
    return token[key];
  }
  return EMPTY_STR;
}

// eslint-disable-next-line import/prefer-default-export
export function getAccessTokenFromLocalStorage() {
  return getToken(ACCESS_TOKEN_KEY);
}

export function setTokenToLocalStorage(authToken: AuthToken | string) {
  let token;

  if (typeof authToken === 'string') {
    token = authToken; // authToken is ''(empty string)
  } else {
    token = JSON.stringify(authToken);
  }
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getHeaderWithRefreshToken() {
  return { [TOKEN_KEY_FOR_HEADER.REFRESH]: getToken(REFRESH_TOKEN_KEY) };
}

export function getDeviceId() {
  // return `This is temporary device token id.(${nanoid()})`;
  return `This is temporary device token id.`;
}
