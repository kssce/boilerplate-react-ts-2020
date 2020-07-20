import { RootState } from '../../data/rootReducer';

// eslint-disable-next-line import/prefer-default-export
export function selectIsLogin({ auth }: RootState) {
  return auth.isLogin;
}

export function selectUserSeq({ user }: RootState) {
  return user.user?.seq;
}
