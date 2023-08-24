import Router from 'express';
import {
  addUserToChatById,
  createChat, getChatById, getChatByUserId, getChats,
} from '../controllers/ChatController.js';

const router = new Router();

router.get('/', getChats);
router.get('/:chatId', getChatById);
router.get('/:chatId/:userId', getChatByUserId);
router.post('/', createChat);
router.post('/:chatId', addUserToChatById);

export default router;
