import { FC, useMemo } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useAppSelector } from '@services/store';
import { useParams } from 'react-router-dom';
import { getIngredientsSelector } from '@services/slices';

export const IngredientDetails: FC = () => {
  const ingredients = useAppSelector(getIngredientsSelector);
  const { id } = useParams();

  const ingredientData = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
