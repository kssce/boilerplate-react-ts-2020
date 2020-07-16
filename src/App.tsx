import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useInitializeApp } from './lib/initializer/useInitializeApp';
import Main from './components/pages/Main';
import { loginRouter } from './components/pages/routes';

function App() {
  useInitializeApp();
  return (
    <div id="main">
      <Switch>
        <Route path={loginRouter.uri} component={loginRouter.component} />
        <Route component={Main} />
      </Switch>
    </div>
  );
}

export default App;
