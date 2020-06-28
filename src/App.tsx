import React from 'react';
import { useInitializeApp } from './lib/initializer/useInitializeApp';
import { BoardList } from './components/board';

function App() {
  useInitializeApp();

  return (
    <div id="main">
      <h2>Boilerplate for React by Typescript</h2>
      <BoardList />
    </div>
  );
}

export default App;
