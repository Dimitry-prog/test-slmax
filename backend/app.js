import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Server } from 'socket.io';
import appRouter from './routes/index.js';
import handleErrors from './middlewares/handleErrors.js';
import { CORS_OPTIONS, DB_URL_DEV, RATE_LIMIT } from './utils/constants.js';
import { errorLogger, requestLogger } from './middlewares/logger.js';

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(helmet());
app.use(RATE_LIMIT);
app.use(cookieParser());
app.use(express.json());

app.use(express.static('./uploads'));

app.use(cors(CORS_OPTIONS));

app.use(appRouter);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.DB_URL : DB_URL_DEV, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`SERVER WORKS!!! at port ${PORT}`));

    const io = new Server(5000, {
      pingTimeout: 60000,
      cors: {
        origin: ['http://localhost:5173', 'https://admin.socket.io'],
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    io.on('connection', (socket) => {
      console.log('connected to io', socket.id);

      socket.on('start', (user) => {
        console.log('user connected', user);
        socket.join(user);
        socket.emit('connected');
      });

      socket.on('join to chat', (chat) => {
        socket.join(chat);
        console.log('User join to chat', chat);
      });

      socket.on('send message', (data) => {
        console.log('message back', data);
        socket.to(data.chatId).emit('receive message', data, (error) => {
          if (error) {
            console.error('Error sending message:', error);
          } else {
            console.log('Message sent from back');
          }
        });
      });

      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
      });
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
