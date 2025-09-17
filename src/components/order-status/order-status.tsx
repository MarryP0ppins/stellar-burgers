import { FC, useMemo } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = useMemo(() => {
    switch (status) {
      case 'pending':
        return '#E52B1A';
      case 'done':
        return '#00CCCC';
      default:
        return '#F2F2F3';
    }
  }, [status]);

  return <OrderStatusUI textStyle={textStyle} text={statusText[status]} />;
};
