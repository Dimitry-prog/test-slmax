import { ERRORS_MESSAGE, ERRORS_NAME, HTTP_STATUS_CODE } from '../utils/constants.js';
import BadRequestError from '../errors/BadRequestError.js';
import MessageModel from '../models/MessageModel.js';
import ChatModel from '../models/ChatModel.js';
import NotFoundError from '../errors/NotFoundError .js';
import UserModel from '../models/UserModel.js';

export const getMessages = async (req, res, next) => {
  try {
    const messages = await MessageModel.find({});

    if (!messages) {
      return next(new NotFoundError(ERRORS_MESSAGE.messagesNotFound));
    }
    return res.json(messages);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getMessagesByChatId = async (req, res, next) => {
  try {
    const messages = await MessageModel.find({
      chatId: {
        $eq: req.params.chatId,
      },
    }).populate(['owner']);

    if (!messages) {
      return next(new NotFoundError(ERRORS_MESSAGE.messagesNotFound));
    }
    return res.json(messages);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getMessageById = async (req, res, next) => {
  try {
    const message = await MessageModel.findById(req.params.messageId).populate(['owner', 'chatId']);

    if (!message) {
      return next(new NotFoundError(ERRORS_MESSAGE.messageNotFound));
    }
    return res.json(message);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const chat = await ChatModel.findById(req.body.chatId);

    const message = await MessageModel.create({
      message: req.body.message,
      owner: req.user._id,
      name: user.name,
      chatId: req.body.chatId,
    });

    chat.messages.push(message);
    await chat.save();

    return res.status(HTTP_STATUS_CODE.created).json(message);
  } catch (e) {
    if (e.name === ERRORS_NAME.validationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};
