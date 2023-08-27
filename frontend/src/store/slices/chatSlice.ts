import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { ChatType } from '../../types/chatTypes';
import { addUserToChat, getChatById, getChats } from '../../api/chatApi';
import { UserType } from '../../types/userTypes';

type ChatSliceType = {
  chats: ChatType[];
  currentChat: ChatType | null;
  usersInCurrentChat: UserType[];
  chatId: string | null;
  status: 'init' | 'loading' | 'success' | 'error';
  error: string | undefined;
};

const initialState: ChatSliceType = {
  chats: [],
  currentChat: null,
  usersInCurrentChat: [],
  chatId: null,
  status: 'init',
  error: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ChatSliceType>) => {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats = action.payload.map((chat) => ({
          id: chat._id,
          users: [...chat.users],
          messages: [...chat.messages],
          images: [...chat.images],
          title: chat.title,
        }));
      })
      .addCase(getChatById.fulfilled, (state, action) => {
        state.currentChat = action.payload;
      })
      .addCase(addUserToChat.fulfilled, (state, action) => {
        const isUserExist = state.usersInCurrentChat.find(
          (user) => user._id === action.payload._id
        );
        if (!isUserExist) {
          state.usersInCurrentChat.push(action.payload);
        }
      })
      // .addMatcher(
      //   (action) => action.type.endsWith('/fulfilled'),
      //   (state) => {
      //     state.status = 'success';
      //   }
      // )
      // .addMatcher(
      //   (action) => action.type.endsWith('/pending'),
      //   (state) => {
      //     state.status = 'loading';
      //   }
      // )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'error';
          state.error = action.payload;
        }
      );
  },
});

export const { reducer: chatReducer, actions: chatActions } = chatSlice;
