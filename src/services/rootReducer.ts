import { combineReducers } from '@reduxjs/toolkit';
import {
  constructorSlice,
  feedsSlice,
  ingredientsSlice,
  ordersSlice,
  userSlice
} from '@services/slices';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});
