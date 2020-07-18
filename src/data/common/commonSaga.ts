import { put, call, take } from 'redux-saga/effects';
import { HANDLE_ERR, setLoading } from './commonReducer';
import { NwMethod } from '../../lib/constants/network';
import axiosInstance from '../../lib/initializer/xhrInitializer';

export interface ApiOption {
  method: NwMethod;
  url: string;
  data?: { [key: string]: any };
  headers?: { [key: string]: any };
}

export function* callAPISaga(options: ApiOption, apiInstance = axiosInstance) {
  yield put(setLoading(true));
  try {
    return yield call(apiInstance.request, options);
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
