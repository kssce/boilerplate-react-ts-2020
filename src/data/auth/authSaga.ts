import { call, put, take } from 'redux-saga/effects';
import { callAPISaga } from '../common/comonSaga';
import { NwMethod } from '../../lib/constants/network';
import { handleErr } from '../common/commonReducer';
import {
  URI_LOGIN,
  URI_LOGOUT,
  URI_LOGIN_WITH_TOKEN,
  URI_REFRESH_TOKEN,
} from '../../lib/constants/api';
import { AuthToken, FetchedData } from '../../models/Networks';
import {
  LOGIN,
  LOGOUT,
  setLogin,
  LOGIN_WITH_TOKEN,
  REFRESH_TOKEN,
} from './authReducer';
import {
  ID_FIELD,
  PW_FIELD,
  DEVICE_TOKEN_FIELD,
} from '../../lib/constants/serverFields';
import { EMPTY_STR } from '../../lib/constants/common';
import {
  setTokenToLocalStorage,
  getHeaderWithRefreshToken,
  getDeviceId,
} from '../../lib/helpers/authHelper';
import { Fn } from '../../models/Common';

export function* loginSaga() {
  while (true) {
    const {
      payload: { [ID_FIELD]: id, [PW_FIELD]: pw },
    } = yield take(LOGIN);

    yield call(runWithHandleForAuthException, function* callback() {
      const {
        data: { value },
      }: FetchedData<AuthToken> = yield call(callAPISaga, {
        method: NwMethod.POST,
        url: URI_LOGIN,
        data: {
          [ID_FIELD]: id,
          [PW_FIELD]: pw,
          [DEVICE_TOKEN_FIELD]: getDeviceId(),
        },
      });

      setTokenToLocalStorage(value);
      yield put(setLogin(true));
    });
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(LOGOUT);

    yield call(runWithHandleForAuthException, function* callback() {
      yield call(callAPISaga, {
        method: NwMethod.POST,
        url: URI_LOGOUT,
        headers: getHeaderWithRefreshToken(),
      });
      setTokenToLocalStorage(EMPTY_STR);
      yield put(setLogin(false));
    });
  }
}

export function* loginWithTokenSaga() {
  while (true) {
    yield take(LOGIN_WITH_TOKEN);

    yield call(runWithHandleForAuthException, function* callback() {
      yield call(callAPISaga, {
        method: NwMethod.POST,
        url: URI_LOGIN_WITH_TOKEN,
        headers: getHeaderWithRefreshToken(),
      });
    });
  }
}

export function* refreshTokenSaga() {
  while (true) {
    yield take(REFRESH_TOKEN);
    yield call(runWithHandleForAuthException, function* callback() {
      const {
        data: { value },
      }: FetchedData<AuthToken> = yield call(callAPISaga, {
        method: NwMethod.POST,
        url: URI_REFRESH_TOKEN,
        headers: getHeaderWithRefreshToken(),
      });
      setTokenToLocalStorage(value);
      yield put(setLogin(true));
    });
  }
}

function* runWithHandleForAuthException(callback: Fn) {
  try {
    yield call(callback);
  } catch (err) {
    yield call(clearLoginDataSaga);
    yield put(handleErr({ err }));
  }
}

function* clearLoginDataSaga() {
  setTokenToLocalStorage(EMPTY_STR);
  yield put(setLogin(false));
}
