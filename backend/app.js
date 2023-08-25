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
  } catch (e) {
    console.log(e);
  }
};

startApp();

const io = new Server(PORT, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('connected to io', socket.id);

  socket.on('join to room', (room) => {
    socket.join(room);
    console.log('User join to room', socket.id, room);
  });

  socket.on('send message', (message) => {
    socket.to(message.room).emit('receive message', message);
    console.log('Message');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});
