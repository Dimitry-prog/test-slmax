import { ChatType } from '../types/chatTypes';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getMessagesByChatId } from '../api/messageApi';
import { chatActions } from '../store/slices/chatSlice';

type ChatSingleProps = {
  chat: ChatType;
};

const ChatSingle = ({ chat }: ChatSingleProps) => {
  const { id, title, users, messages, images } = chat;
  const dispatch = useAppDispatch();
  const currentChatId = useAppSelector((state) => state.chat.currentChat?.id);
  const lastMessage = messages.at(-1)?.message;

  const handleGetChat = (chatId: string) => {
    dispatch(chatActions.setChatId(chatId));
    dispatch(getMessagesByChatId(chatId));
  };

  return (
    <li
      onClick={() => handleGetChat(id)}
      className={`px-4 py-3 max-h-[72px] flex gap-4 cursor-pointer hover:bg-black-super-light transition-all duration-500 ${
        currentChatId === id ? 'bg-blue-light' : ''
      }`}
    >
      {/*<Avatar src={avatar} alt={title} size="md" />*/}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <h3 className="font-bold line-clamp-1">{title}</h3>
          {/*<p className="text-sm text-black-extra-light">{formattedTime(created_at)}</p>*/}
        </div>
        <p className="text-black-extra-light line-clamp-1">{lastMessage}</p>
      </div>
    </li>
  );
};

export default ChatSingle;
