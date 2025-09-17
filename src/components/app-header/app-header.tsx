import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '@services/store';
import { getUserSelector } from '@services/slices';

export const AppHeader: FC = () => {
  const user = useAppSelector(getUserSelector);
  return <AppHeaderUI userName={user.name} />;
};
