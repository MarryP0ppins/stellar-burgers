import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { apiGetFeeds } from '../actions';

export interface TFeedsState {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };

  error: string | null;
  isLoading: boolean;
}

const initialState: TFeedsState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  error: null,
  isLoading: false
};

export const feedsSlice = createSlice({
  name: 'feedsSlice',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeedsSelector: (state) => state.orders,
    getFeedsInfoSelector: (state) => state.feed,
    getIsLoadingFeedsSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetFeeds.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.feed = { total, totalToday };
        state.isLoading = false;
      })
      .addCase(apiGetFeeds.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(apiGetFeeds.rejected, (state, action) => {
        state.orders = [];
        state.feed = { total: 0, totalToday: 0 };
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  }
});

export const {
  getFeedsInfoSelector,
  getIsLoadingFeedsSelector,
  getOrdersFeedsSelector
} = feedsSlice.selectors;
