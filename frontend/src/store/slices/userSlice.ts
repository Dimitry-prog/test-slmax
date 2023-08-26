import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../../api/authApi';
import { UserType } from '../../types/userTypes';
import { getUser } from '../../api/userApi';

type UserStateType = {
  users: UserType[];
  userInfo: UserType | null;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: UserStateType = {
  users: [],
  userInfo: null,
  status: 'init',
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserStateType>) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
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

export const { reducer: userReducer, actions: userActions } = userSlice;
