import Router from 'express';
import {
  addUserToChatById, createChat, getChatById, getChatByUserId, getChats,
} from '../controllers/ChatController.js';
import { validationAddUserToChat, validationCreateChat } from '../helpers/validationCelebrate.js';

const router = new Router();

router.get('/', getChats);
router.get('/:chatId', getChatById);
router.get('/:chatId/:userId', getChatByUserId);
router.post('/', validationCreateChat, createChat);
router.post('/:chatId', validationAddUserToChat, addUserToChatById);

export default router;
