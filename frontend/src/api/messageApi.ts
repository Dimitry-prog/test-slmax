import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, handleRequest } from './api';
import { GET_MESSAGES_BY_CHAT_ID_URL, GET_MESSAGES_URL } from '../utils/constants';
import { MessageRequestType, MessageType } from '../types/messagesType';

export const getMessages = createAsyncThunk<
  MessageType[],
  undefined,
  {
    rejectValue: string;
  }
>('message/getMessages', async (undefined, { rejectWithValue }) => {
  const request = api(GET_MESSAGES_URL);
  return handleRequest(request, rejectWithValue);
});

export const getMessagesByChatId = createAsyncThunk<
  MessageType[],
  string,
  {
    rejectValue: string;
  }
>('message/getMessagesByChatId', async (id, { rejectWithValue }) => {
  const request = api(GET_MESSAGES_BY_CHAT_ID_URL(id));
  return handleRequest(request, rejectWithValue);
});

export const createMessage = createAsyncThunk<
  MessageType,
  MessageRequestType,
  {
    rejectValue: string;
  }
>('message/createMessage', async (data, { rejectWithValue }) => {
  const request = api.post(GET_MESSAGES_URL, data);
  return handleRequest(request, rejectWithValue);
});
