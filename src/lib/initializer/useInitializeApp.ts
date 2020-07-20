import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { xhrInitialize } from './xhrInitializer';
import { loginWithToken } from '../../data/auth/authReducer';
import initDeviceToken from './initDeviceToken';

// eslint-disable-next-line import/prefer-default-export
export function useInitializeApp(): void {
  const dispatch = useDispatch();

  useEffect(() => {
    xhrInitialize(dispatch);
    initDeviceToken();
    dispatch(loginWithToken());
  }, [dispatch]);
}
