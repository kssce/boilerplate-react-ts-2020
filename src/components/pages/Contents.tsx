import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';
import {
  rootRouter,
  notFoundRouter,
  boardListRouter,
  RouterType,
  aboutRouter,
} from './routes';
import PrivateRoute from '../auth/PrivateRoute';

export default function Contents(): JSX.Element {
  return (
    <Root>
      <Switch>
        <PrivateRoute
          path={boardListRouter.uri}
          component={boardListRouter.component}
        />
        <PrivateRoute
          path={aboutRouter.uri}
          component={aboutRouter.component}
        />
        <Route
          path={rootRouter.uri}
          exact
          render={redirectTo(boardListRouter)}
        />
        <Route component={notFoundRouter.component} />
      </Switch>
    </Root>
  );
}

function redirectTo(routing: RouterType) {
  return function renderer() {
    return <Redirect to={routing.uri} />;
  };
}

const Root = styled.div`
  display: flex;
`;
