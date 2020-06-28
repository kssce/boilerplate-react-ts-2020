import { call, take, put } from 'redux-saga/effects';
import { FETCH_BOARD_LIST, setBoardList, BoardListType } from './boardReducer';
import { callAPISaga } from '../common/comonSaga';
import { NwMethod } from '../../lib/constants/network';
import { handleErr } from '../common/commonReducer';
import { URI_BOARD_LIST } from '../../lib/constants/api';
import { FetchedData } from '../../models/Networks';

// eslint-disable-next-line import/prefer-default-export
export function* fetchBoardListSaga() {
  while (true) {
    yield take(FETCH_BOARD_LIST);

    try {
      const {
        data: { value },
      }: FetchedData<BoardListType> = yield call(callAPISaga, {
        method: NwMethod.GET,
        url: URI_BOARD_LIST,
      });
      yield put(setBoardList(value));
    } catch (err) {
      yield put(handleErr({ err }));
    }
  }
}
