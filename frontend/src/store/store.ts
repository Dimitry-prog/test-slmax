import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './slices/chatSlice';
import { userReducer } from './slices/userSlice';
import { authReducer } from './slices/authSlice';
import { messageReducer } from './slices/messageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
