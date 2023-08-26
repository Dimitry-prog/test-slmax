import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, handleRequest } from './api';
import { GET_USER_INFO_URL } from '../utils/constants';
import { UserType } from '../types/userTypes';

export const getUser = createAsyncThunk<
  UserType,
  undefined,
  {
    rejectValue: string;
  }
>('user/getUser', async (undefined, { rejectWithValue }) => {
  const request = api(GET_USER_INFO_URL);
  return handleRequest(request, rejectWithValue);
});
