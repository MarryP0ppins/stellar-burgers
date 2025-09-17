import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiGetOrders = createAsyncThunk(
  'orders/apiGetOrders',
  getOrdersApi
);

export const apiOrderBurger = createAsyncThunk(
  'orders/apiOrderBurger',
  orderBurgerApi
);

export const apiGetOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumberApi',
  getOrderByNumberApi
);
