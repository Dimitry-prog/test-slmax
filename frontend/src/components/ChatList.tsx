import { useAppSelector } from '../hooks/reduxHooks';
import ChatSingle from './ChatSingle';
import Loader from './Loader';
import { Socket } from 'socket.io-client';
import CreateChat from './CreateChat';

type ChatListProps = {
  socket: Socket;
};

const ChatList = ({ socket }: ChatListProps) => {
  const chats = useAppSelector((state) => state.chat.chats);
  const status = useAppSelector((state) => state.chat.status);

  return (
    <div className="w-[360px]">
      <h2 className="py-[20px] px-4 font-bold text-lg">All chats</h2>
      {!chats.length && <p className="p-4 text-lg">Созданных чатов нет</p>}
      <CreateChat />
      {status === 'loading' ? (
        <Loader />
      ) : (
        <ul className="flex flex-col">
          {chats.map((chat) => (
            <ChatSingle key={chat.id} chat={chat} socket={socket} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
