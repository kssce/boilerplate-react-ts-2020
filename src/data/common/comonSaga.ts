import { put, call, take } from 'redux-saga/effects';
import axios, { AxiosStatic } from 'axios';
import { HANDLE_ERR, setLoading } from './commonReducer';
import { NwMethod } from '../../lib/constants/network';

export interface ApiOption {
  method: NwMethod;
  url: string;
}

export function* callAPISaga(
  options: ApiOption,
  apiInstance: AxiosStatic = axios,
) {
  yield put(setLoading(true));
  try {
    return yield call(apiInstance[options.method], options.url);
  } finally {
    yield put(setLoading(false));
  }
}

export function* handleErrSaga() {
  while (true) {
    const { payload } = yield take(HANDLE_ERR);
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const { err, loggingTarget } = payload;

    // call(callAPISaga, {
    //   method: METHOD.POST,
    //   url: URI_REPORTING_ERR,
    // })
  }
}
