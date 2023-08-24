import rateLimit from 'express-rate-limit';

export const RATE_LIMIT = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const HTTP_STATUS_CODE = {
  created: 201,
  ok: 200,
  badRequest: 400,
  authRequired: 401,
  forbidden: 403,
  notFound: 404,
  userExist: 409,
  serverCrashed: 500,
};

export const ALLOWED_CORS = [
  'https://last-diplom.nomoredomains.rocks',
  'http://last-diplom.nomoredomains.rocks',
  'https://api.last-diplom.nomoredomains.rocks',
  'http://api.last-diplom.nomoredomains.rocks',
  'localhost:3000',
  'localhost:5000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:5000',
  'https://localhost:5000',
];

export const CORS_OPTIONS = {
  origin: ALLOWED_CORS,
  optionsSuccessStatus: 200,
  credentials: true,
};

export const DB_URL_DEV = 'mongodb+srv://admin:admin@cluster0.deipiap.mongodb.net/chat?retryWrites=true&w=majority';

// export const DB_URL_DEV = 'mongodb://127.0.0.1:27017/chat';

export const ERRORS_MESSAGE = {
  userNotFound: 'User not found',
  userExist: 'You already registered, please login instead',
  userExistInChat: 'User already exist in chat',
  incorrectData: 'Incorrect data',
  authRequired: 'Authorization required',
  serverCrashed: 'Oh, Server crashed',
  notFound: 'Path not found',
  notValidEmail: 'is not valid email address!',
  notValidLink: 'is not valid link!',
  messageNotFound: 'Message not found',
  messagesNotFound: 'Messages not found',
  chatNotFound: 'Chat not found',
  chatsNotFound: 'Chats not found',
  invalidTypeImage: 'Invalid file type of image',
  imageNotFound: 'Image not found',
  imagesNotFound: 'Images not found',
};

export const RESPONSE_MESSAGE = {
  userLogout: 'Bye, see you later',
  userLoginSuccess: 'Authentication successful',
  fileUploaded: 'File uploaded successfully',
};

export const ERRORS_NAME = {
  validationError: 'ValidationError',
  castError: 'CastError',
};

export const JWT_SECRET_DEV = 'super-secret-string';
