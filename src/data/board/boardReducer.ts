import { createAction, ActionType, createReducer } from 'typesafe-actions';
import produce from 'immer';

// [ types ]
export const FETCH_BOARD_LIST = 'board/fetch_board_list';
export const SET_BOARD_LIST = 'board/set_board_list';

// [ actions ]
export const fetchBoardList = createAction(FETCH_BOARD_LIST)();
export const setBoardList = createAction(SET_BOARD_LIST)<BoardListType>();
const actions = { fetchBoardList, setBoardList };
type BoardAction = ActionType<typeof actions>;
// type BoardAction =
//   | { type: typeof FETCH_BOARD_LIST }
//   | { type: typeof SET_BOARD_LIST };

// [ data ]
export interface BoardItem {
  id: number;
  name: string;
}
export type BoardListType = BoardItem[];
interface BoardState {
  list: BoardListType;
}
const INITIAL_BOARD_STATE: BoardState = {
  list: [],
};

// [ reducers ]
export default createReducer<BoardState, BoardAction>(INITIAL_BOARD_STATE, {
  [SET_BOARD_LIST]: (state, { payload }) => {
    return produce(state, draft => {
      draft.list = payload;
    });
  },
});
