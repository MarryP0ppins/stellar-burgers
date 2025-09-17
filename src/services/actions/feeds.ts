import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiGetFeeds = createAsyncThunk('orders/apiGetFeeds', getFeedsApi);
