export type MessageType = {
  message: string;
  owner: string;
  name: string;
  _id: string;
};

type ImageType = {
  fileName: string;
  path: string;
  contentType: string;
  owner: string;
};

export type ChatType = {
  id: string;
  users: string[];
  messages: MessageType[];
  images: ImageType[];
  title: string;
};

export type ChatResponseType = Omit<ChatType, 'id'> & {
  _id: string;
};
