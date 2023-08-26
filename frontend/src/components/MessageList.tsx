import { useAppSelector } from '../hooks/reduxHooks';
import MessageSingle from './MessageSingle';
import SendMessage from './SendMessage';
import Loader from './Loader';

const MessageList = () => {
  const status = useAppSelector((state) => state.message.status);
  const messages = useAppSelector((state) => state.message.chatMessages);
  const chatId = useAppSelector((state) => state.chat.chatId);

  return (
    <>
      {messages && (
        <div className="px-6 pt-6 flex flex-col grow shadow">
          {!messages.length && chatId && <p className="p-4 text-lg">Сообщений в чате нет</p>}
          {status === 'loading' ? (
            <Loader />
          ) : (
            <>
              <ul className="flex flex-col gap-3 grow">
                {messages.map((message) => (
                  <MessageSingle key={message._id} msg={message} />
                ))}
              </ul>
              <SendMessage />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessageList;
