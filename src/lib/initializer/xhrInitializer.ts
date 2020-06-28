import { Dispatch } from 'react';
import axios from 'axios';
import { BASE_URI, TIMEOUT } from '../constants/network';
import { handleErr } from '../../data/common/commonReducer';

axios.defaults.baseURL = BASE_URI;
axios.defaults.timeout = TIMEOUT;

const initReqHeader = async () => {
  axios.interceptors.request.use(
    async config => {
      // eslint-disable-next-line quotes
      const accessTk = "I'm a token.";
      config.headers.access_token = accessTk;
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    },
  );
};

// eslint-disable-next-line import/prefer-default-export
export async function xhrInitialize(dispatch: Dispatch<any>): Promise<void> {
  try {
    await initReqHeader();
  } catch (err) {
    dispatch(handleErr({ err }));
  }
}
