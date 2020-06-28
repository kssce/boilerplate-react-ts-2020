import { combineReducers } from 'redux';
import boardReducer from './board/boardReducer';
import commonReducer from './common/commonReducer';

const rootReducer = combineReducers({
  common: commonReducer,
  board: boardReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
