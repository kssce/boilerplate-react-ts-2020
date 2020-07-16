import { fork } from 'redux-saga/effects';
import { fetchBoardListSaga } from './board/boardSaga';
import { handleErrSaga } from './common/comonSaga';
import {
  logoutSaga,
  loginSaga,
  loginWithTokenSaga,
  refreshTokenSaga,
} from './auth/authSaga';

export default function* rootSaga() {
  // common
  yield fork(handleErrSaga);

  // auth
  yield fork(loginSaga);
  yield fork(loginWithTokenSaga);
  yield fork(logoutSaga);
  yield fork(refreshTokenSaga);

  // board
  yield fork(fetchBoardListSaga);
}
