import { createSlice, freeze } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { apiGetOrderByNumber, apiGetOrders, apiOrderBurger } from '../actions';

export interface TOrdersState {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderInfo: TOrder | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
  orderInfo: null,
  error: null,
  isLoading: true
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  selectors: {
    allOrdersSelector: (state) => state.orders,
    getOrderRequestSelector: (state) => state.orderRequest,
    getOrderModalDataSelector: (state) => state.orderModalData,
    getCurrentOrderInfoSelector: (state) => state.orderInfo
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(apiGetOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(apiGetOrders.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(apiOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(apiOrderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(apiOrderBurger.rejected, (state, action) => {
        state.error = action.error.message ?? null;
      });
    builder
      .addCase(apiGetOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderInfo = action.payload.orders.at(0) ?? null;
      })
      .addCase(apiGetOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(apiGetOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const { resetOrder } = ordersSlice.actions;
export const {
  getCurrentOrderInfoSelector,
  allOrdersSelector,
  getOrderRequestSelector,
  getOrderModalDataSelector
} = ordersSlice.selectors;
