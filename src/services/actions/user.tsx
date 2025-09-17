import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const apiGetUser = createAsyncThunk('user/apiGetUser', getUserApi);
export const apiUpdateUser = createAsyncThunk(
  'user/apiUpdateUser',
  updateUserApi
);
export const apiRegisterUser = createAsyncThunk(
  'user/apiRegisterUser',
  registerUserApi
);
export const apiLoginUser = createAsyncThunk('user/apiLoginUser', loginUserApi);
export const apiLogoutUser = createAsyncThunk('user/apiLogoutUser', logoutApi);
