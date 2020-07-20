import { combineReducers } from 'redux';
import boardReducer from './board/boardReducer';
import commonReducer from './common/commonReducer';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  common: commonReducer,
  board: boardReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
