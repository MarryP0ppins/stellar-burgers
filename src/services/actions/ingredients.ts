import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiGetIngredients = createAsyncThunk(
  'ingredients/apiGetIngredients',
  getIngredientsApi
);
