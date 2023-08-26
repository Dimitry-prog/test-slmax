export type MessageType = {
  _id: string;
  message: string;
  name: string;
  chatId: string | ChatId;
  owner: OwnerType;
  __v: number;
};

type OwnerType = {
  _id: string;
  name: string;
  email: string;
  __v: number;
};

type ChatId = {
  _id: string;
  users: string[];
  messages: MessageType[];
  images: [];
  title: string;
  __v: number;
};

export type MessageRequestType = Pick<MessageType, 'message' | 'chatId'>;
