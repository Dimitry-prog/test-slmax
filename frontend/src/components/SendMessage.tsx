import attach from '../assets/img/attach.svg';
import send from '../assets/img/sendMsg.svg';
import { FormEvent } from 'react';
import useFormValidation from '../hooks/useFormValidation';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { createMessage, getMessagesByChatId } from '../api/messageApi';
import { Socket } from 'socket.io-client';
import { getChats } from '../api/chatApi';

type SendMessageProps = {
  socket: Socket;
};

const SendMessage = ({ socket }: SendMessageProps) => {
  const { errors, isValid, handleChange, handleBlur, resetForm, values } = useFormValidation();
  const status = useAppSelector((state) => state.message.status);
  const chatId = useAppSelector((state) => state.chat.chatId);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      message: values.message,
      chatId: chatId as string,
    };
    await dispatch(createMessage(data));
    await socket.emit('send message', data);
    dispatch(getMessagesByChatId(chatId as string));
    dispatch(getChats());
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 flex flex-col gap-1">
      <div className="relative flex flex-col gap-2">
        <input
          value={values.message || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="message"
          placeholder="Type messsage"
          disabled={status === 'loading'}
          required
          pattern="[a-zA-Zа-яА-Я0-9ё-\s]{1,}"
          className={`${
            errors.message ? 'invalid:ring-red invalid:ring-2' : ''
          } min-h-[40px] max-w-[1000px] px-4 py-[10px] text-black placeholder:text-gray-extra-light border border-gray-extra-light rounded line-clamp-3 outline-none overflow-y-scroll focus:ring-2 disabled:opacity-80 transition-all duration-500`}
        />
        <span className="absolute -bottom-[15px] text-xs text-red">
          {errors.message ? 'Сообщение должно быть не  менее 1-го символа' : ''}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="attach"
          className="p-2 flex items-center justify-center rounded hover:bg-gray transition-all duration-500"
        >
          <img src={attach} alt="attach" className="w-6 h-6 object-cover" />
        </button>
        <button
          type="submit"
          aria-label="send"
          disabled={status === 'loading' || !isValid}
          className="p-2 flex items-center justify-center rounded hover:bg-gray transition-all duration-500"
        >
          <img src={send} alt="send" className="w-6 h-6 object-cover" />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
