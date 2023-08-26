import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { MessageType } from '../../types/messagesType';
import { getMessages, getMessagesByChatId } from '../../api/messageApi';

type MessageSliceType = {
  messages: MessageType[];
  chatMessages: MessageType[];
  currentMessage: MessageType | null;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: MessageSliceType = {
  messages: [],
  chatMessages: [],
  currentMessage: null,
  status: 'init',
  error: undefined,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MessageSliceType>) => {
    builder
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getMessagesByChatId.fulfilled, (state, action) => {
        state.chatMessages = action.payload;
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

export const { reducer: messageReducer, actions: messageActions } = messageSlice;
