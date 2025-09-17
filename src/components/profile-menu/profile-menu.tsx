import { FC, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '@services/store';
import { apiLogoutUser } from '@services/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const handleLogout = useCallback(() => {
    dispatch(apiLogoutUser());
  }, [dispatch]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
