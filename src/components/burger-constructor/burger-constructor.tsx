import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearItems,
  constructorSliceStoreSelector,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  resetOrder,
  isUserAuthedSelector
} from '@services/slices';

import { useAppDispatch, useAppSelector } from '@services/store';

import { apiOrderBurger } from '@services/actions';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(isUserAuthedSelector);
  const constructorItems = useAppSelector(constructorSliceStoreSelector);
  const orderRequest = useAppSelector(getOrderRequestSelector);
  const orderModalData = useAppSelector(getOrderModalDataSelector);

  const onOrderClick = useCallback(() => {
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      apiOrderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ])
    );
  }, [
    constructorItems.bun,
    constructorItems.ingredients,
    dispatch,
    isAuth,
    navigate,
    orderRequest
  ]);

  const closeOrderModal = useCallback(() => {
    dispatch(resetOrder());
    dispatch(clearItems());
    navigate('/');
  }, [dispatch, navigate]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
