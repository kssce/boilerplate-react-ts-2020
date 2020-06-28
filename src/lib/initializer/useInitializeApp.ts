import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { xhrInitialize } from './xhrInitializer';

// eslint-disable-next-line import/prefer-default-export
export function useInitializeApp(): void {
  const dispatch = useDispatch();

  useEffect(() => {
    xhrInitialize(dispatch);
  }, [dispatch]);
}
