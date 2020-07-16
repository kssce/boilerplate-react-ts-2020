import { RootState } from '../../data/rootReducer';

// eslint-disable-next-line import/prefer-default-export
export function selectIsLogin({ auth }: RootState) {
  return auth.isLogin;
}
