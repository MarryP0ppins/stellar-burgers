import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppSelector, useAppDispatch } from '@services/store';
import {
  constructorSliceStoreSelector,
  deleteItem,
  setItems
} from '@services/slices';
import { TConstructorIngredient } from '@utils-types';

const swapElements = (
  state: TConstructorIngredient[],
  index: number,
  step: number
) => {
  const copy = structuredClone(state);
  [copy[index], copy[index + step]] = [copy[index + step], copy[index]];
  return copy;
};

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const constructorItems = useAppSelector(constructorSliceStoreSelector);

    const handleMove = useCallback(
      (step: number) => () => {
        dispatch(
          setItems(swapElements(constructorItems.ingredients, index, -1 * step))
        );
      },
      [constructorItems.ingredients, dispatch, index]
    );

    const handleClose = useCallback(() => {
      dispatch(deleteItem(ingredient));
    }, [dispatch, ingredient]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMove(1)}
        handleMoveDown={handleMove(-1)}
        handleClose={handleClose}
      />
    );
  }
);
