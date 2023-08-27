import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import MessageSingle from './MessageSingle';
import SendMessage from './SendMessage';
import Loader from './Loader';
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { getMessagesByChatId } from '../api/messageApi';

type MessageListProps = {
  socket: Socket;
};

const MessageList = ({ socket }: MessageListProps) => {
  const status = useAppSelector((state) => state.message.status);
  const messages = useAppSelector((state) => state.message.chatMessages);
  const chatId = useAppSelector((state) => state.chat.chatId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('receive message', (data) => {
      dispatch(getMessagesByChatId(data.chatId));
    });
  });

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
              <SendMessage socket={socket} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessageList;
