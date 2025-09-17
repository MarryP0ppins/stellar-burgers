import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  apiGetUser,
  apiLoginUser,
  apiLogoutUser,
  apiRegisterUser,
  apiUpdateUser
} from '../actions';

export interface TUserState {
  isAuthChecked: boolean;
  isLoading: boolean;
  user: TUser;
  error: string | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  isLoading: false,
  user: { name: '', email: '' },
  error: null
};

const setUserAuth = (state: TUserState, user: TUser) => {
  state.isLoading = false;
  state.error = null;
  state.isAuthChecked = true;
  state.user = user;
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  selectors: {
    isUserAuthedSelector: (state) => state.isAuthChecked,
    getUserSelector: (state) => state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiRegisterUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        setUserAuth(state, user);
      })
      .addCase(apiRegisterUser.pending, (state) => {
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
        state.error = null;
        state.isLoading = true;
      })
      .addCase(apiRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
    builder
      .addCase(apiLoginUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        setUserAuth(state, user);
      })
      .addCase(apiLoginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.user = { name: '', email: '' };
        state.error = null;
        state.isLoading = true;
      })
      .addCase(apiLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message ?? null;
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        setUserAuth(state, user);
      })
      .addCase(apiGetUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message ?? null;
      });
    builder
      .addCase(apiUpdateUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        setUserAuth(state, user);
      })
      .addCase(apiUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message ?? null;
      });
    builder.addCase(apiLogoutUser.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.isLoading = false;
      state.user = { name: '', email: '' };
      state.error = null;
    });
  }
});

export const { isUserAuthedSelector, getUserSelector } = userSlice.selectors;
