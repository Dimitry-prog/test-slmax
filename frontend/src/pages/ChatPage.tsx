import ChatList from '../components/ChatList';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import { useEffect } from 'react';
import { getChats } from '../api/chatApi';
import { useAppDispatch } from '../hooks/reduxHooks';
import * as io from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types';

const socket: io.Socket<ServerToClientEvents, ClientToServerEvents> = io.connect(
  'http://localhost:5000',
  {
    timeout: 60000,
  }
);

const ChatPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <div className="h-screen flex">
      <aside className="h-full">
        <ChatList socket={socket} />
      </aside>
      <div className="w-full flex flex-col">
        <Header />
        <MessageList socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
