import Router from 'express';
import {
  createMessage, getMessageById, getMessages, getMessagesByChatId,
} from '../controllers/MessageController.js';
import { validationCreateMessage } from '../helpers/validationCelebrate.js';

const router = new Router();

router.get('/', getMessages);
router.get('/:messageId', getMessageById);
router.get('/:chatId/messages', getMessagesByChatId);
router.post('/', validationCreateMessage, createMessage);

export default router;
