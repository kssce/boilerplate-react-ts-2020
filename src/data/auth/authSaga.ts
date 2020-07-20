import { call, put, take } from 'redux-saga/effects';
import { callAPISaga } from '../common/commonSaga';
import { handleErr } from '../common/commonReducer';
import {
  URI_LOGIN,
  URI_LOGOUT,
  URI_LOGIN_WITH_TOKEN,
  URI_REFRESH_TOKEN,
  URI_DEVICE_TOKEN,
} from '../../lib/constants/api';
import { AuthToken, FetchedData, NwMethod } from '../../models/Networks';
import {
  LOGIN,
  LOGOUT,
  setLogin,
  LOGIN_WITH_TOKEN,
  REFRESH_TOKEN,
  LOGIN_WITH_TOKEN_AND_RETURN_LOGIN_RESULT,
} from './authReducer';
import { DEVICE_TOKEN_KEY, EMPTY_STR } from '../../lib/constants/common';
import {
  setTokenToLocalStorage,
  getHeaderWithRefreshToken,
  getToken,
  hasTokenFromLocalStorage,
} from '../../lib/helpers/authHelper';
import { Fn } from '../../models/Common';
import AppDatabase, {
  TableName,
  AccessMode,
  getDbAndTable,
} from '../../lib/modules/AppDatabase';
import { setUser } from '../user/userReducer';
import { CredentialFields } from '../../models/ServerFields';

export function* loginSaga() {
  const {
    id: idField,
    pw: pwField,
    deviceToken: deviceTokenField,
  } = CredentialFields;
  while (true) {
    const {
      payload: { [idField]: id, [pwField]: pw },
    } = yield take(LOGIN);

    yield call(runWithHandleForAuthException, function* callbackForSuccess() {
      const deviceToken = yield call(getDeviceTokenSaga);
      const {
        data: { value },
      }: FetchedData<AuthToken> = yield call(callAPISaga, {
        method: NwMethod.POST,
        url: URI_LOGIN,
        data: {
          [idField]: id,
          [pwField]: pw,
          [deviceTokenField]: deviceToken,
        },
      });

      yield put(setLogin(true));
      setTokenToLocalStorage(value);
    });
  }
}

export function* logoutSaga() {
  while (true) {
    yield take(LOGOUT);

    yield call(runWithHandleForAuthException, function* callbackForSuccess() {
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
    yield call(runWithHandleForAuthException, function* callbackForSuccess() {
      yield call(loginWithTokenAndReturnLoginStateSaga);
    });
  }
}

export function* loginWithTokenAndResolvePromiseSaga() {
  while (true) {
    const {
      payload: { returnLoginResultAs },
    } = yield take(LOGIN_WITH_TOKEN_AND_RETURN_LOGIN_RESULT);

    yield call(
      runWithHandleForAuthException,
      function* callbackForSuccess() {
        const loginState = yield call(loginWithTokenAndReturnLoginStateSaga);
        if (returnLoginResultAs) returnLoginResultAs(loginState);
      },
      function* callbackForFail() {
        if (returnLoginResultAs) yield returnLoginResultAs(false);
      },
    );
  }
}

function* loginWithTokenAndReturnLoginStateSaga() {
  if (!hasTokenFromLocalStorage()) {
    yield put(setLogin(false));
    return false;
  }

  const headers = getToken() || {};
  yield call(callAPISaga, {
    method: NwMethod.POST,
    url: URI_LOGIN_WITH_TOKEN,
    headers,
  });
  yield put(setLogin(true));
  return true;
}

export function* refreshTokenSaga() {
  while (true) {
    yield take(REFRESH_TOKEN);

    if (!hasTokenFromLocalStorage()) {
      yield put(setLogin(false));
      return;
    }

    yield call(runWithHandleForAuthException, function* callbackForSuccess() {
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

function* runWithHandleForAuthException(
  callbackForSuccess: Fn,
  callbackForFail?: Fn,
) {
  try {
    yield call(callbackForSuccess);
  } catch (err) {
    yield call(clearLoginDataSaga);
    yield put(handleErr({ err }));
    yield put(setUser(null));

    if (callbackForFail) yield call(callbackForFail);
  }
}

function* clearLoginDataSaga() {
  setTokenToLocalStorage(EMPTY_STR);
  yield put(setLogin(false));
}

export function* getDeviceTokenSaga() {
  try {
    const { db, table: metaTable } = yield call(getDbAndTable, TableName.META);
    let deviceToken = yield call(getDeviceTokenFromLocalSaga, db, metaTable);

    if (!deviceToken) {
      deviceToken = yield call(getDeviceTokenFromServerSaga);
      yield call(setDeviceTokenToLocalSaga, db, metaTable, deviceToken);
    }
    return deviceToken;
  } catch (err) {
    yield put(handleErr({ err }));
    return null;
  }
}

function* getDeviceTokenFromLocalSaga(db: AppDatabase, metaTable: any) {
  return yield db.transaction(AccessMode.RW, metaTable, async () => {
    const metaTableRows = await metaTable.toArray();

    if (!metaTableRows.length) return null;

    const { [CredentialFields.deviceToken]: deviceToken } = metaTableRows[0];
    return deviceToken;
  });
}

function* getDeviceTokenFromServerSaga() {
  const {
    data: { value: deviceTokenFromServer },
  } = yield call(callAPISaga, {
    method: NwMethod.GET,
    url: URI_DEVICE_TOKEN,
  });

  return deviceTokenFromServer;
}

function* setDeviceTokenToLocalSaga(
  db: AppDatabase,
  metaTable: any,
  deviceToken: string,
) {
  return yield db.transaction(AccessMode.RW, metaTable, async () => {
    // return created auto increment id
    return metaTable.add({
      [DEVICE_TOKEN_KEY]: deviceToken,
      createdAt: new Date(),
    });
  });
}
