import { api, handleRequest } from './api';
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from '../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthLoginType, AuthRegisterType } from '../types/authTypes';
import { UserType } from '../types/userTypes';

export const registerUser = createAsyncThunk<
  UserType,
  AuthRegisterType,
  {
    rejectValue: string;
  }
>('auth/register', async (data, { rejectWithValue }) => {
  const request = api.post(REGISTER_URL, data);
  return handleRequest(request, rejectWithValue);
});

export const loginUser = createAsyncThunk<
  string,
  AuthLoginType,
  {
    rejectValue: string;
  }
>('auth/login', async (data, { rejectWithValue }) => {
  const request = api.post(LOGIN_URL, data);
  return handleRequest(request, rejectWithValue);
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  const request = api(LOGOUT_URL);
  return handleRequest(request, rejectWithValue);
});

// export const checkUserToken = createAsyncThunk(
//   'auth/checkToken',
//   async (_, { rejectWithValue }) => {
//     const request = api(GET_CHATS);
//     return handleRequest(request, rejectWithValue);
//   }
// );
