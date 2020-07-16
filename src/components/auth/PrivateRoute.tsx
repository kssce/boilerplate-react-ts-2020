import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../lib/helpers/selector';
import { loginRouter } from '../pages/routes';

interface Router {
  component: any;
  path: string;
  exact?: boolean;
}

function PrivateRoute({ component: Component, ...rest }: Router) {
  const isLogin = useSelector(selectIsLogin);

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

export default PrivateRoute;
