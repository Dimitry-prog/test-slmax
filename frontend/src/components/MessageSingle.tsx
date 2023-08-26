import { useAppSelector } from '../hooks/reduxHooks';
import { MessageType } from '../types/messagesType';

type MessageSingleProps = {
  msg: MessageType;
};

const MessageSingle = ({ msg }: MessageSingleProps) => {
  const { message, owner, name, _id } = msg;
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const isMyMsg = owner._id === userInfo?._id;

  return (
    <li className="flex flex-col gap-2">
      {/*{date && <SystemMessage date={formattedDate(created_at)} />}*/}
      {/*{is_new && <NewMessage />}*/}
      <div className={`flex gap-2 ${isMyMsg ? 'justify-end' : ''}`}>
        {/*{!user.you && <Avatar src={user.avatar} alt={user.name} size="sm" />}*/}
        <div
          className={`flex flex-col gap-1 max-w-[550px] px-3 py-2 rounded ${
            isMyMsg ? 'bg-blue-dark' : 'bg-gray'
          }`}
        >
          {!isMyMsg && <h4 className="font-bold">{name}</h4>}
          <p>{message}</p>
          {/*<TimeMessage time={formattedTime(created_at)} my={user.you} />*/}
        </div>
      </div>
    </li>
  );
};

export default MessageSingle;
