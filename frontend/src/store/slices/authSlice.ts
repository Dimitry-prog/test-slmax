import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../api/authApi';

type AuthStateType = {
  isAuth: boolean;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: AuthStateType = {
  isAuth: false,
  status: 'init',
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthStateType>) => {
    builder
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'success';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.isAuth = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'error';
          state.error = action.payload;
        }
      );
  },
});

export const { reducer: authReducer, actions: authActions } = authSlice;
