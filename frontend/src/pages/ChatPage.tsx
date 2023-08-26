import ChatList from '../components/ChatList';
import Header from '../components/Header';
import MessageList from '../components/MessageList';
import { useEffect } from 'react';
import { getChats } from '../api/chatApi';
import { useAppDispatch } from '../hooks/reduxHooks';

const ChatPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChats());
  }, []);

  return (
    <div className="h-screen flex">
      <aside className="h-full">
        <ChatList />
      </aside>
      <div className="w-full flex flex-col">
        <Header />
        <MessageList />
      </div>
    </div>
  );
};

export default ChatPage;
