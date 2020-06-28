import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { produce } from 'immer';

// [ types ]
const LOADING = 'common/loading';
export const HANDLE_ERR = 'common/handle_err';

// [ actions ]
export const setLoading = createAction(LOADING)<LoadingState>();
export const handleErr = createAction(HANDLE_ERR)<ErrorReport>();
const actions = { setLoading, handleErr };
type CommonAction = ActionType<typeof actions>;

// [ data ]
type LoadingState = boolean;
interface CommonState {
  isLoading: LoadingState;
}
interface ErrorReport {
  err: Error;
  loggingTarget?: string;
}
const INITIAL_COMMON_STATE: CommonState = {
  isLoading: false,
};

// [ reducer ]
export default createReducer<CommonState, CommonAction>(INITIAL_COMMON_STATE, {
  [LOADING]: (state, { payload }) => {
    return produce(state, draft => {
      draft.isLoading = payload;
    });
  },
});
