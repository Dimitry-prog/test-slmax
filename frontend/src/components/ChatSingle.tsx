import { ChatType } from '../types/chatTypes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getMessagesByChatId } from '../api/messageApi';
import { chatActions } from '../store/slices/chatSlice';
import { Socket } from 'socket.io-client';
import { addUserToChat } from '../api/chatApi';

type ChatSingleProps = {
  chat: ChatType;
  socket: Socket;
};

const ChatSingle = ({ chat, socket }: ChatSingleProps) => {
  const { id, title, users, messages, images } = chat;
  const dispatch = useAppDispatch();
  const chatId = useAppSelector((state) => state.chat.chatId);
  const lastMessage = messages.at(-1)?.message;
  const userId = useAppSelector((state) => state.user.userInfo?._id);

  const handleGetChat = async (chatId: string) => {
    dispatch(chatActions.setChatId(chatId));
    dispatch(addUserToChat(chatId));
    await dispatch(getMessagesByChatId(chatId));
    socket.emit('start', userId);
    socket.on('connected', () => console.log('HELLOO'));
    socket.emit('join to chat', chatId);
  };

  return (
    <li
      onClick={() => handleGetChat(id)}
      className={`px-4 py-3 max-h-[72px] flex gap-4 cursor-pointer hover:bg-black-super-light transition-all duration-500 ${
        chatId === id ? 'bg-blue-light' : ''
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="font-bold line-clamp-1">{title}</h3>
        </div>
        <p className="text-black-extra-light line-clamp-1">{lastMessage}</p>
      </div>
    </li>
  );
};

export default ChatSingle;
