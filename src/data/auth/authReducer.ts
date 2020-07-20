import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';
import { HookFormable } from '../../models/Form';
import { AuthToken } from '../../models/Networks';
import { EMPTY_STR } from '../../lib/constants/common';
import { NullableBoolean, Promisable } from '../../models/Common';
import { CredentialFields } from '../../models/ServerFields';

// [ types ]
export const LOGIN = 'auth/login';
export const LOGIN_WITH_TOKEN = 'auth/login_with_token';
export const LOGIN_WITH_TOKEN_AND_RETURN_LOGIN_RESULT =
  'auth/login_with_token_and_resolve_promise';
export const LOGOUT = 'auth/logout';
export const SET_LOGIN = 'auth/set_login_info';
export const REFRESH_TOKEN = 'auth/refresh_token';

// [ actions ]
export const login = createAction(LOGIN)<Authable | HookFormable>();
export const loginWithToken = createAction(LOGIN_WITH_TOKEN)();
export const loginWithTokenAndReturnLoginResult = createAction(
  LOGIN_WITH_TOKEN_AND_RETURN_LOGIN_RESULT,
)<Promisable>();
export const setLogin = createAction(SET_LOGIN)<boolean>();
export const logout = createAction(LOGOUT)();
export const refreshToken = createAction(REFRESH_TOKEN)();
const actions = { login, setLogin, loginWithToken, refreshToken, logout };
type AuthAction = ActionType<typeof actions>;

// [ data ]
export interface AuthableWithoutSecret {
  [CredentialFields.id]: string;
}
export interface Authable extends AuthableWithoutSecret {
  [CredentialFields.pw]: string;
}
const INITIAL_TOKEN: AuthToken = {
  accessToken: EMPTY_STR,
  refreshToken: EMPTY_STR,
};
interface AuthState {
  isLogin: NullableBoolean;
  token: AuthToken | null;
}
const INITIAL_AUTH_STATE: AuthState = {
  isLogin: null,
  token: INITIAL_TOKEN,
};

// [ reducers ]
export default createReducer<AuthState, AuthAction>(INITIAL_AUTH_STATE, {
  [SET_LOGIN]: (state, { payload }) => {
    return produce(state, draft => {
      draft.isLogin = payload;
    });
  },
});
