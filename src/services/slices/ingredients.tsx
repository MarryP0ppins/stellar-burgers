import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { apiGetIngredients } from '../actions';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsErrorSelector: (state) => state.error,
    getBunsSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    getMainsSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    getSaucesSelector: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    getIngredientsLoadingSelector: (state) => state.isLoading,
    getIngredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(apiGetIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getBunsSelector,
  getMainsSelector,
  getSaucesSelector,
  getIngredientsErrorSelector,
  getIngredientsLoadingSelector,
  getIngredientsSelector
} = ingredientsSlice.selectors;
