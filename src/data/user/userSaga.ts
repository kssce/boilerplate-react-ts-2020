import { call, put, take } from 'redux-saga/effects';
import { callAPISaga } from '../common/commonSaga';
import { handleErr } from '../common/commonReducer';
import { URI_USER } from '../../lib/constants/api';
import { FETCH_USER, setUser, User } from './userReducer';
import { FetchedData, NwMethod } from '../../models/Networks';

// eslint-disable-next-line import/prefer-default-export
export function* fetchUserSaga() {
  while (true) {
    yield take(FETCH_USER);

    try {
      const user = yield call(fetchUserFormServerSaga);
      yield put(setUser(user));
    } catch (err) {
      yield put(handleErr({ err }));
    }
  }
}

export function* fetchUserFormServerSaga() {
  const {
    data: { value },
  }: FetchedData<User> = yield call(callAPISaga, {
    method: NwMethod.GET,
    url: URI_USER,
  });
  return value;
}
