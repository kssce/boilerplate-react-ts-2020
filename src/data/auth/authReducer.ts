import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';
import { HookFormable } from '../../models/Form';
import { ID_FIELD, PW_FIELD } from '../../lib/constants/serverFields';
import { AuthToken } from '../../models/Networks';
import { EMPTY_STR } from '../../lib/constants/common';

// [ types ]
export const LOGIN = 'auth/login';
export const LOGIN_WITH_TOKEN = 'auth/login_with_token';
export const LOGOUT = 'auth/logout';
export const SET_LOGIN = 'auth/set_login_info';
export const REFRESH_TOKEN = 'auth/refresh_token';

// [ actions ]
export const login = createAction(LOGIN)<User | HookFormable>();
export const loginWithToken = createAction(LOGIN_WITH_TOKEN)();
export const setLogin = createAction(SET_LOGIN)<boolean>();
export const logout = createAction(LOGOUT)();
export const refreshToken = createAction(REFRESH_TOKEN)();
const actions = { login, setLogin, loginWithToken, refreshToken, logout };
type AuthAction = ActionType<typeof actions>;

// [ data ]
export interface UserWithoutSecret {
  [ID_FIELD]: string;
}
export interface User extends UserWithoutSecret {
  [PW_FIELD]: string;
}
const INITIAL_TOKEN: AuthToken = {
  accessToken: EMPTY_STR,
  refreshToken: EMPTY_STR,
};
type UserState = UserWithoutSecret | null;
interface AuthState {
  user: UserState;
  isLogin: boolean;
  token: AuthToken | null;
}
const INITIAL_AUTH_STATE: AuthState = {
  user: null,
  isLogin: false,
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
