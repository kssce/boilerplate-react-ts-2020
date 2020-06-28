import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
let store: any;

export default (() => {
  if (store) return store;

  initStoreByEnv();
  sagaMiddleware.run(rootSaga);

  return store;
})();

function initStoreByEnv() {
  if (process.env.NODE_ENV !== 'production') {
    store = createStore(
      reducers,
      {},
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );
  } else {
    store = createStore(reducers, {}, compose(applyMiddleware(sagaMiddleware)));
  }
}
