import { Dispatch } from 'react';
import axios from 'axios';
import { BASE_URI, TIMEOUT } from '../../configs/network';
import { getAccessTokenFromLocalStorage } from '../helpers/authHelper';
import { refreshToken } from '../../data/auth/authReducer';
import { TokenFieldsForHeader } from '../../models/ServerFields';
import { HttpCode } from '../../models/Networks';

axios.defaults.baseURL = BASE_URI;
axios.defaults.timeout = TIMEOUT;

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  timeout: TIMEOUT,
});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers[
      TokenFieldsForHeader.access
    ] = getAccessTokenFromLocalStorage();
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// eslint-disable-next-line import/prefer-default-export
export async function xhrInitialize(dispatch: Dispatch<any>): Promise<void> {
  await initResHeader(dispatch);
}

async function initResHeader(dispatch: Dispatch<any>) {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const status = error.response ? error.response.status : null;

      handleCommonException(dispatch, status);

      return Promise.reject(error);
    },
  );
}

function handleCommonException(dispatch: Dispatch<any>, status: any) {
  switch (status) {
    case HttpCode.UNAUTHORIZED:
      dispatch(refreshToken());
      break;

    case HttpCode.FORBIDDEN:
      // 자원 요청 거부 공통 로직
      break;

    case HttpCode.INTERNAL_SERVER_ERROR:
      // 서버 에러 공통 로직
      break;

    default:
      break;
  }
}

export default axiosInstance;
