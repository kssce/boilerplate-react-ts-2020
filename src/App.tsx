import React from 'react';
import { useInitializeApp } from './lib/initializer/useInitializeApp';
import Main from './components/pages/Main';

function App() {
  useInitializeApp();

  return (
    <div id="main">
      <h2>Boilerplate for React by Typescript</h2>
      <Main />
    </div>
  );
}

export default App;
