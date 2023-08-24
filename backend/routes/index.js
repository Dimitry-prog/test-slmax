import Router from 'express';
import userRouter from './UserRouter.js';
import handleAuthUser from '../middlewares/handleAuthUser.js';
import { loginUser, logoutUser, registerUser } from '../controllers/AuthController.js';
import NotFoundError from '../errors/NotFoundError .js';
import { validationSignin, validationSignup } from '../helpers/validationCelebrate.js';
import { ERRORS_MESSAGE } from '../utils/constants.js';
import messageRouter from './MessageRouter.js';
import chatRouter from './ChatRouter.js';
import imageRouter from './ImageRouter.js';

const router = new Router();

router.post('/signup', validationSignup, registerUser);
router.post('/signin', validationSignin, loginUser);
router.get('/signout', logoutUser);

router.use(handleAuthUser);

router.use('/users', userRouter);
router.use('/messages', messageRouter);
router.use('/chats', chatRouter);
router.use('/images', imageRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(ERRORS_MESSAGE.notFound));
});

export default router;
