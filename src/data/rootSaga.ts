import { fork } from 'redux-saga/effects';
import { fetchBoardListSaga } from './board/boardSaga';
import { handleErrSaga } from './common/commonSaga';
import {
  logoutSaga,
  loginSaga,
  loginWithTokenSaga,
  refreshTokenSaga,
  loginWithTokenAndResolvePromiseSaga,
} from './auth/authSaga';
import { fetchUserSaga } from './user/userSaga';

export default function* rootSaga() {
  // common
  yield fork(handleErrSaga);

  // auth
  yield fork(loginSaga);
  yield fork(loginWithTokenSaga);
  yield fork(logoutSaga);
  yield fork(refreshTokenSaga);
  yield fork(loginWithTokenAndResolvePromiseSaga);

  // user
  yield fork(fetchUserSaga);

  // board
  yield fork(fetchBoardListSaga);
}
