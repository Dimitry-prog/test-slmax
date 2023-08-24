import {
  ERRORS_MESSAGE, ERRORS_NAME, RESPONSE_MESSAGE,
} from '../utils/constants.js';
import BadRequestError from '../errors/BadRequestError.js';
import ImageModel from '../models/ImageModel.js';
import NotFoundError from '../errors/NotFoundError .js';
import ChatModel from '../models/ChatModel.js';

export const getImages = async (req, res, next) => {
  try {
    const images = await ImageModel.find({});

    if (!images) {
      return next(new NotFoundError(ERRORS_MESSAGE.imagesNotFound));
    }
    return res.json(images);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const downloadImage = async (req, res, next) => {
  try {
    const image = await ImageModel.findById(req.params.imageId);

    if (!image) {
      return next(new NotFoundError(ERRORS_MESSAGE.imageNotFound));
    }
    const imagePath = `http://localhost:3000/${image.path}`;
    return res.sendFile(imagePath);
    // return res.json(image);
  } catch (e) {
    if (e.name === ERRORS_NAME.castError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const { originalname, mimetype, path } = req.file;

    if (!mimetype.startsWith('image/')) {
      return next(new BadRequestError(ERRORS_MESSAGE.invalidTypeImage));
    }
    const image = await ImageModel.create({
      fileName: originalname,
      path: path.replace(/\\/g, '/'),
      contentType: mimetype,
      owner: req.user._id,
    });

    const chat = await ChatModel.findById(req.body.chatId);
    chat.images.push(image);
    await chat.save();

    return res.json({ message: RESPONSE_MESSAGE.fileUploaded });
  } catch (e) {
    if (e.name === ERRORS_NAME.validationError) {
      return next(new BadRequestError());
    }
    return next(e);
  }
};
