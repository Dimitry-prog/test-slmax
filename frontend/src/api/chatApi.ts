import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, handleRequest } from './api';
import { GET_CHAT_BY_ID_URL, GET_CHATS_URL } from '../utils/constants';
import { ChatResponseType, ChatType } from '../types/chatTypes';
import { UserType } from '../types/userTypes';

export const getChats = createAsyncThunk<
  ChatResponseType[],
  undefined,
  {
    rejectValue: string;
  }
>('chat/getChats', async (undefined, { rejectWithValue }) => {
  const request = api(GET_CHATS_URL);
  return handleRequest(request, rejectWithValue);
});

export const getChatById = createAsyncThunk<
  ChatType,
  string,
  {
    rejectValue: string;
  }
>('chat/getChatById', async (id, { rejectWithValue }) => {
  const request = api(GET_CHAT_BY_ID_URL(id));
  return handleRequest(request, rejectWithValue);
});

export const addUserToChat = createAsyncThunk<
  UserType,
  string,
  {
    rejectValue: string;
  }
>('chat/addUserToChat', async (id, { rejectWithValue }) => {
  const request = api.post(GET_CHAT_BY_ID_URL(id));
  return handleRequest(request, rejectWithValue);
});

export const createChat = createAsyncThunk<
  ChatType,
  { title: string },
  {
    rejectValue: string;
  }
>('chat/createChat', async (title, { rejectWithValue }) => {
  const request = api.post(GET_CHATS_URL, title);
  return handleRequest(request, rejectWithValue);
});
