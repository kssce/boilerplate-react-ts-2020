import { fork } from 'redux-saga/effects';
import { fetchBoardListSaga } from './board/boardSaga';
import { handleErrSaga } from './common/comonSaga';

export default function* rootSaga() {
  // common
  yield fork(handleErrSaga);

  // board
  yield fork(fetchBoardListSaga);
}
