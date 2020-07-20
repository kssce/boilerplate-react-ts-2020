import { AuthToken } from '../../models/Networks';
import { AUTH_TOKEN_KEY, EMPTY_STR } from '../constants/common';
import {
  getItemFromLocalStorage,
  setItemFromLocalStorage,
} from './localStorage';
import {
  CredentialFields,
  TokenFieldsForHeader,
} from '../../models/ServerFields';

const {
  accessToken: accessTokenKey,
  refreshToken: refreshTokenKey,
} = CredentialFields;

export function getToken(key?: typeof accessTokenKey | typeof refreshTokenKey) {
  const serializedToken = getItemFromLocalStorage(AUTH_TOKEN_KEY);
  if (serializedToken) {
    const token: AuthToken = JSON.parse(serializedToken);
    return key ? token[key] : token;
  }
  return EMPTY_STR;
}

// eslint-disable-next-line import/prefer-default-export
export function getAccessTokenFromLocalStorage() {
  return getToken(accessTokenKey);
}

export function setTokenToLocalStorage(authToken: AuthToken | string) {
  let token;

  if (typeof authToken === 'string') {
    token = authToken; // authToken is ''(empty string)
  } else {
    token = JSON.stringify(authToken);
  }
  setItemFromLocalStorage(AUTH_TOKEN_KEY, token);
}

export function getHeaderWithRefreshToken() {
  return {
    [TokenFieldsForHeader.refresh]: getToken(refreshTokenKey),
  };
}

export function hasTokenFromLocalStorage() {
  return getToken() !== EMPTY_STR;
}
