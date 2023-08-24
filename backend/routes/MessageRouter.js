import Router from 'express';
import { createMessage, getMessageById, getMessages } from '../controllers/MessageController.js';

const router = new Router();

router.get('/', getMessages);
router.get('/:messageId', getMessageById);
router.post('/', createMessage);

export default router;
