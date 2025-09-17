import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { allOrdersSelector } from '@services/slices';
import { apiGetOrders } from '@services/actions';
import { useAppDispatch, useAppSelector } from '@services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(apiGetOrders());
  }, [dispatch]);
  const orders: TOrder[] = useAppSelector(allOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
