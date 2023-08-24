import { ERRORS_MESSAGE, ERRORS_NAME, HTTP_STATUS_CODE } from '../utils/constants.js';
import BadRequestError from '../errors/BadRequestError.js';
import ChatModel from '../models/ChatModel.js';
import NotFoundError from '../errors/NotFoundError .js';
import ExistUserError from '../errors/ExistUserError.js';

export const getChats = async (req, res, next) => {
  try {
    const chats = await ChatModel.find({});

    if (!chats) {
      return next(new NotFoundError(ERRORS_MESSAGE.chatsNotFound));
    }

    return res.json(chats);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getChatById = async (req, res, next) => {
  try {
    const chat = await ChatModel.findById(req.params.chatId);

    if (!chat) {
      return next(new NotFoundError(ERRORS_MESSAGE.chatNotFound));
    }

    return res.json(chat);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const addUserToChatById = async (req, res, next) => {
  try {
    const chat = await ChatModel.findOne({
      _id: req.params.chatId,
    });

    if (!chat) {
      return next(new NotFoundError(ERRORS_MESSAGE.chatNotFound));
    }

    const isUserExist = chat.users.find((user) => user === req.user._id);

    if (isUserExist) {
      return next(new ExistUserError(ERRORS_MESSAGE.userExistInChat));
    }

    chat.users.push(req.user._id);
    await chat.save();
    return res.json(chat);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const getChatByUserId = async (req, res, next) => {
  try {
    const chat = await ChatModel.findOne({
      _id: req.params.chatId,
      users: {
        $in: [req.params.userId],
      },
    });

    if (!chat) {
      return next(new NotFoundError(ERRORS_MESSAGE.chatNotFound));
    }

    return res.json(chat);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const createChat = async (req, res, next) => {
  try {
    const chat = await ChatModel.create({
      users: [req.body.userId],
      messages: [],
      title: req.body.title,
    });

    return res.status(HTTP_STATUS_CODE.created).json(chat);
  } catch (e) {
    if (e.name === ERRORS_NAME.validationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};
