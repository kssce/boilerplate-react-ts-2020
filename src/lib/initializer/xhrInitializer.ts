import { Dispatch } from 'react';
import axios from 'axios';
import { BASE_URI, TIMEOUT, HTTP_CODE } from '../constants/network';
import { handleErr } from '../../data/common/commonReducer';
import { getAccessTokenFromLocalStorage } from '../helpers/authHelper';
import { TOKEN_KEY_FOR_HEADER } from '../constants/serverFields';
import { refreshToken } from '../../data/auth/authReducer';

axios.defaults.baseURL = BASE_URI;
axios.defaults.timeout = TIMEOUT;

// eslint-disable-next-line import/prefer-default-export
export async function xhrInitialize(dispatch: Dispatch<any>): Promise<void> {
  try {
    await initReqHeader();
    await initResHeader(dispatch);
  } catch (err) {
    dispatch(handleErr({ err }));
  }
}

async function initReqHeader() {
  axios.interceptors.request.use(
    async config => {
      config.headers[
        TOKEN_KEY_FOR_HEADER.ACCESS
      ] = getAccessTokenFromLocalStorage();
      // config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
}

async function initResHeader(dispatch: Dispatch<any>) {
  axios.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;

      if (status === HTTP_CODE.UNAUTHORIZED) {
        dispatch(refreshToken());
      }

      return Promise.reject(error);
    },
  );
}
