import { useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { logout } from '../../data/auth/authReducer';

export default function useLogout() {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return useMemo(() => handleLogout, [handleLogout]);
}
