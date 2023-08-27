export type AxiosKnownErrorType = {
  message: string;
};

export type ServerToClientEvents = {
  'receive message': (data: { message: string; chatId: string }) => void;
};

export type ClientToServerEvents = {
  'send message': (data: { message: string; chatId: string }) => void;
};
