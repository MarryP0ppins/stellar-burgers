import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '@services/store';
import {
  getIngredientsSelector,
  getCurrentOrderInfoSelector
} from '@services/slices';
import { apiGetOrderByNumber } from '@services/actions';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const id = Number(number);
  const disapth = useAppDispatch();
  const ingredients: TIngredient[] = useAppSelector(getIngredientsSelector);
  const orderData = useAppSelector(getCurrentOrderInfoSelector);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    disapth(apiGetOrderByNumber(id));
  }, [disapth, id]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
