import React, { useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRouter } from '../pages/routes';
import { loginWithTokenAndReturnLoginResult } from '../../data/auth/authReducer';
import usePromise from '../../lib/hooks/usePromise';
import { selectIsLogin } from '../../lib/helpers/selector';

interface Router {
  component: any;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ component: Component, ...rest }: Router) {
  const { isLogin, isRefreshed } = useLoginState();

  if (isRefreshed) return null;

  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: loginRouter.uri, state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function useLoginState() {
  const dispatch = useDispatch();
  const loginStateFromStore = useSelector(selectIsLogin);
  // return { isLogin: loginStateFromStore, isRefreshed: false };

  const { resolved: loginStateFromLocalStorage } = usePromise(() => {
    return new Promise(resolve => {
      dispatch(loginWithTokenAndReturnLoginResult({ resolve }));
    });
  }, [loginStateFromStore]);

  return useMemo(
    () => ({
      isLogin: loginStateFromStore || loginStateFromLocalStorage,
      isRefreshed: loginStateFromStore === null,
    }),
    [loginStateFromLocalStorage, loginStateFromStore],
  );
}

export default PrivateRoute;
