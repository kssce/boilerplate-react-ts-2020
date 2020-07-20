import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';
import { UserFields } from '../../models/ServerFields';

// [ types ]
export const FETCH_USER = 'user/fetch_user';
export const SET_USER = 'auth/set_user';

// [ actions ]
export const fetchUser = createAction(FETCH_USER)();
export const setUser = createAction(SET_USER)<NullableUser>();
const actions = { fetchUser, setUser };
type UserAction = ActionType<typeof actions>;

// [ data ]
export interface User {
  [UserFields.seq]: number;
  [UserFields.id]: string;
  [UserFields.nickname]: string;
}
type NullableUser = User | null;
interface UserState {
  user: NullableUser;
}
const INITIAL_USER_STATE: UserState = {
  user: null,
};

// [ reducers ]
export default createReducer<UserState, UserAction>(INITIAL_USER_STATE, {
  [SET_USER]: (state, { payload }) => {
    return produce(state, draft => {
      draft.user = payload;
    });
  },
});
